const Docker = require('dockerode');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const path = require('path');
const logger = require('./logger');

const docker = new Docker();

const languageConfig = {
  cpp: {
    image: 'gcc:latest',
    extension: 'cpp',
    compileCmd: (filename) => `g++ -o /app/output /app/${filename} -std=c++17`,
    runCmd: '/app/output',
    timeout: 5000
  },
  java: {
    image: 'openjdk:17-slim',
    extension: 'java',
    compileCmd: (filename) => `javac /app/${filename}`,
    runCmd: (classname) => `java -cp /app ${classname}`,
    timeout: 5000
  },
  python: {
    image: 'python:3.11-slim',
    extension: 'py',
    runCmd: (filename) => `python /app/${filename}`,
    timeout: 5000
  },
  javascript: {
    image: 'node:18-alpine',
    extension: 'js',
    runCmd: (filename) => `node /app/${filename}`,
    timeout: 5000
  }
};

class CodeExecutor {
  constructor() {
    this.tempDir = path.join(__dirname, '../temp');
    this.ensureTempDir();
  }

  async ensureTempDir() {
    try {
      await fs.access(this.tempDir);
    } catch {
      await fs.mkdir(this.tempDir, { recursive: true });
    }
  }

  async executeCode(code, language, input, timeLimit = 5000, memoryLimit = '256m') {
    const sessionId = uuidv4();
    const config = languageConfig[language];
    
    if (!config) {
      return {
        success: false,
        error: 'Unsupported language',
        verdict: 'Compilation Error'
      };
    }

    let container = null;
    let startTime = Date.now();

    try {
      // Create temporary directory for this execution
      const sessionDir = path.join(this.tempDir, sessionId);
      await fs.mkdir(sessionDir, { recursive: true });

      // Determine filename and classname
      let filename, classname;
      if (language === 'java') {
        // Extract class name from Java code
        const classMatch = code.match(/public\s+class\s+(\w+)/);
        classname = classMatch ? classMatch[1] : 'Solution';
        filename = `${classname}.${config.extension}`;
      } else {
        filename = `solution.${config.extension}`;
      }

      const filePath = path.join(sessionDir, filename);
      await fs.writeFile(filePath, code);

      // Create input file
      const inputPath = path.join(sessionDir, 'input.txt');
      await fs.writeFile(inputPath, input || '');

      // Create container
      container = await docker.createContainer({
        Image: config.image,
        Cmd: ['/bin/sh'],
        Tty: false,
        OpenStdin: true,
        StdinOnce: false,
        HostConfig: {
          Binds: [`${sessionDir}:/app`],
          Memory: this.parseMemoryLimit(memoryLimit),
          NetworkMode: 'none',
          AutoRemove: false
        },
        WorkingDir: '/app'
      });

      await container.start();

      // Compilation step (if needed)
      if (config.compileCmd) {
        const compileCmd = typeof config.compileCmd === 'function' 
          ? config.compileCmd(filename) 
          : config.compileCmd;
        
        const compileResult = await this.execInContainer(container, compileCmd);
        
        if (compileResult.exitCode !== 0) {
          await this.cleanup(container, sessionDir);
          return {
            success: false,
            error: compileResult.stderr || 'Compilation failed',
            verdict: 'Compilation Error',
            executionTime: Date.now() - startTime
          };
        }
      }

      // Execution step
      let runCmd = config.runCmd;
      if (typeof runCmd === 'function') {
        runCmd = language === 'java' ? runCmd(classname) : runCmd(filename);
      }

      const execResult = await this.execInContainer(
        container, 
        `${runCmd} < /app/input.txt`,
        timeLimit
      );

      const executionTime = Date.now() - startTime;

      // Determine verdict
      let verdict = 'Accepted';
      let output = execResult.stdout;
      let error = '';

      if (execResult.timeout) {
        verdict = 'Time Limit Exceeded';
        error = 'Execution time exceeded the limit';
      } else if (execResult.exitCode !== 0) {
        verdict = 'Runtime Error';
        error = execResult.stderr || 'Runtime error occurred';
      }

      await this.cleanup(container, sessionDir);

      return {
        success: verdict === 'Accepted',
        output: output.trim(),
        error,
        verdict,
        executionTime,
        exitCode: execResult.exitCode
      };

    } catch (error) {
      logger.error(`Code execution error: ${error.message}`);
      
      if (container) {
        try {
          await container.remove({ force: true });
        } catch (e) {
          logger.error(`Container cleanup error: ${e.message}`);
        }
      }

      return {
        success: false,
        error: error.message,
        verdict: 'Runtime Error',
        executionTime: Date.now() - startTime
      };
    }
  }

  async execInContainer(container, command, timeout = 10000) {
    return new Promise(async (resolve) => {
      let timedOut = false;
      let stdout = '';
      let stderr = '';

      const timeoutHandle = setTimeout(() => {
        timedOut = true;
        resolve({
          exitCode: -1,
          stdout: '',
          stderr: '',
          timeout: true
        });
      }, timeout);

      try {
        const exec = await container.exec({
          Cmd: ['/bin/sh', '-c', command],
          AttachStdout: true,
          AttachStderr: true
        });

        const stream = await exec.start();

        stream.on('data', (chunk) => {
          const str = chunk.toString('utf8');
          // Docker multiplexes stdout/stderr in the stream
          // First byte indicates the stream type
          if (chunk[0] === 1) {
            stdout += str.substring(8);
          } else if (chunk[0] === 2) {
            stderr += str.substring(8);
          } else {
            stdout += str;
          }
        });

        stream.on('end', async () => {
          if (!timedOut) {
            clearTimeout(timeoutHandle);
            const inspectData = await exec.inspect();
            resolve({
              exitCode: inspectData.ExitCode,
              stdout,
              stderr,
              timeout: false
            });
          }
        });

      } catch (error) {
        clearTimeout(timeoutHandle);
        if (!timedOut) {
          resolve({
            exitCode: -1,
            stdout: '',
            stderr: error.message,
            timeout: false
          });
        }
      }
    });
  }

  parseMemoryLimit(limit) {
    const match = limit.match(/^(\d+)(m|g)?$/i);
    if (!match) return 256 * 1024 * 1024; // Default 256MB
    
    const value = parseInt(match[1]);
    const unit = (match[2] || 'm').toLowerCase();
    
    return unit === 'g' ? value * 1024 * 1024 * 1024 : value * 1024 * 1024;
  }

  async cleanup(container, sessionDir) {
    try {
      await container.stop({ t: 1 });
      await container.remove();
    } catch (error) {
      logger.error(`Container cleanup error: ${error.message}`);
    }

    try {
      await fs.rm(sessionDir, { recursive: true, force: true });
    } catch (error) {
      logger.error(`Directory cleanup error: ${error.message}`);
    }
  }

  async pullImages() {
    const images = Object.values(languageConfig).map(config => config.image);
    const uniqueImages = [...new Set(images)];

    logger.info('Pulling Docker images...');
    
    for (const image of uniqueImages) {
      try {
        logger.info(`Pulling ${image}...`);
        await new Promise((resolve, reject) => {
          docker.pull(image, (err, stream) => {
            if (err) return reject(err);
            
            docker.modem.followProgress(stream, (err, output) => {
              if (err) return reject(err);
              resolve(output);
            });
          });
        });
        logger.info(`Successfully pulled ${image}`);
      } catch (error) {
        logger.error(`Failed to pull ${image}: ${error.message}`);
      }
    }
  }
}

module.exports = new CodeExecutor();
