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
    image: 'eclipse-temurin:17',
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

  // ✅ NEW: Ensure image exists before execution
  async ensureImage(image) {
    try {
      await docker.getImage(image).inspect();
    } catch {
      logger.info(`Image ${image} not found. Pulling...`);
      await new Promise((resolve, reject) => {
        docker.pull(image, (err, stream) => {
          if (err) return reject(err);
          docker.modem.followProgress(stream, (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
      });
      logger.info(`Image ${image} pulled successfully`);
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
      // ✅ Ensure Docker image exists
      await this.ensureImage(config.image);

      const sessionDir = path.join(this.tempDir, sessionId);
      await fs.mkdir(sessionDir, { recursive: true });

      let filename, classname;

      if (language === 'java') {
        const classMatch = code.match(/public\s+class\s+(\w+)/);
        classname = classMatch ? classMatch[1] : 'Main'; // safer default
        filename = `${classname}.${config.extension}`;
      } else {
        filename = `solution.${config.extension}`;
      }

      const filePath = path.join(sessionDir, filename);
      await fs.writeFile(filePath, code);

      const inputPath = path.join(sessionDir, 'input.txt');
      await fs.writeFile(inputPath, input || '');

      container = await docker.createContainer({
        Image: config.image,
        Cmd: ['/bin/sh'],
        Tty: false,
        OpenStdin: true,
        HostConfig: {
          Binds: [`${sessionDir}:/app`],
          Memory: this.parseMemoryLimit(memoryLimit),
          NetworkMode: 'none',
          AutoRemove: true // ✅ auto cleanup container
        },
        WorkingDir: '/app'
      });

      await container.start();

      // 🔹 Compile step
      if (config.compileCmd) {
        const compileCmd = typeof config.compileCmd === 'function'
          ? config.compileCmd(filename)
          : config.compileCmd;

        const compileResult = await this.execInContainer(container, compileCmd);

        if (compileResult.exitCode !== 0) {
          await this.cleanup(null, sessionDir);
          return {
            success: false,
            error: compileResult.stderr || 'Compilation failed',
            verdict: 'Compilation Error',
            executionTime: Date.now() - startTime
          };
        }
      }

      // 🔹 Run step
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

      await this.cleanup(null, sessionDir);

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
          if (chunk[0] === 1) stdout += str.substring(8);
          else if (chunk[0] === 2) stderr += str.substring(8);
          else stdout += str;
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
        resolve({
          exitCode: -1,
          stdout: '',
          stderr: error.message,
          timeout: false
        });
      }
    });
  }

  parseMemoryLimit(limit) {
    const match = limit.match(/^(\d+)(m|g)?$/i);
    if (!match) return 256 * 1024 * 1024;

    const value = parseInt(match[1]);
    const unit = (match[2] || 'm').toLowerCase();

    return unit === 'g'
      ? value * 1024 * 1024 * 1024
      : value * 1024 * 1024;
  }

  async cleanup(container, sessionDir) {
    try {
      if (container) {
        await container.stop({ t: 1 });
        await container.remove();
      }
    } catch (error) {
      logger.error(`Container cleanup error: ${error.message}`);
    }

    try {
      await fs.rm(sessionDir, { recursive: true, force: true });
    } catch (error) {
      logger.error(`Directory cleanup error: ${error.message}`);
    }
  }
}

module.exports = new CodeExecutor();