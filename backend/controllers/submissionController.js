const Submission = require('../models/Submission');
const Problem = require('../models/Problem');
const User = require('../models/User');
const codeExecutor = require('../utils/codeExecutor');
const logger = require('../utils/logger');

// @desc    Submit code
// @route   POST /api/submissions
// @access  Private
exports.submitCode = async (req, res) => {
  try {
    const { problemId, language, code } = req.body;

    if (!problemId || !language || !code) {
      return res.status(400).json({
        success: false,
        message: 'Please provide problemId, language, and code'
      });
    }

    // Get problem with all test cases
    const problem = await Problem.findById(problemId);

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }

    // Create submission
    const submission = await Submission.create({
      userId: req.user.id,
      problemId,
      language,
      code,
      totalTestCases: problem.testCases.length,
      verdict: 'Pending'
    });

    // Execute code against test cases
    let passedCount = 0;
    let totalExecutionTime = 0;
    const testCaseResults = [];
    let finalVerdict = 'Accepted';
    let errorMessage = '';

    for (let i = 0; i < problem.testCases.length; i++) {
      const testCase = problem.testCases[i];
      
      const result = await codeExecutor.executeCode(
        code,
        language,
        testCase.input,
        problem.timeLimit,
        `${problem.memoryLimit}m`
      );

      totalExecutionTime += result.executionTime;

      const testCaseResult = {
        testCaseId: testCase._id,
        passed: false,
        input: testCase.isSample ? testCase.input : '[Hidden]',
        expectedOutput: testCase.isSample ? testCase.output : '[Hidden]',
        actualOutput: result.output || '',
        executionTime: result.executionTime,
        error: result.error || ''
      };

      // Check if output matches
      if (result.success && result.output.trim() === testCase.output.trim()) {
        testCaseResult.passed = true;
        passedCount++;
      } else {
        if (result.verdict === 'Time Limit Exceeded') {
          finalVerdict = 'Time Limit Exceeded';
          errorMessage = 'Time limit exceeded';
        } else if (result.verdict === 'Runtime Error') {
          finalVerdict = 'Runtime Error';
          errorMessage = result.error;
        } else if (result.verdict === 'Compilation Error') {
          finalVerdict = 'Compilation Error';
          errorMessage = result.error;
        } else {
          finalVerdict = 'Wrong Answer';
          errorMessage = `Failed on test case ${i + 1}`;
        }
      }

      testCaseResults.push(testCaseResult);

      // Stop execution if not accepted
      if (!testCaseResult.passed && !testCase.isSample) {
        break;
      }
    }

    // Update submission
    submission.verdict = finalVerdict;
    submission.testCasesPassed = passedCount;
    submission.executionTime = totalExecutionTime;
    submission.errorMessage = errorMessage;
    submission.testCaseResults = testCaseResults;

    // Calculate score
    if (finalVerdict === 'Accepted') {
      submission.score = problem.points;
    }

    await submission.save();

    // Update problem statistics
    problem.totalSubmissions += 1;
    if (finalVerdict === 'Accepted') {
      problem.acceptedSubmissions += 1;
    }
    problem.updateAcceptanceRate();
    await problem.save();

    // Update user statistics
    const user = await User.findById(req.user.id);
    user.statistics.totalSubmissions += 1;
    
    if (finalVerdict === 'Accepted') {
      user.statistics.acceptedSubmissions += 1;
      user.languageStats[language] = (user.languageStats[language] || 0) + 1;

      // Check if first time solving this problem
      const alreadySolved = user.solvedProblems.some(
        p => p.problemId.toString() === problemId
      );

      if (!alreadySolved) {
        user.solvedProblems.push({
          problemId,
          difficulty: problem.difficulty
        });

        user.statistics[problem.difficulty.toLowerCase()] += 1;
        user.totalScore += problem.points;
        submission.isFirstAccepted = true;

        // Update streak
        user.updateStreak();
      }
    }

    await user.save();

    // Return results
    res.status(200).json({
      success: true,
      message: finalVerdict === 'Accepted' 
        ? '🎉 Congratulations! All test cases passed!' 
        : `❌ ${finalVerdict}`,
      data: {
        submissionId: submission._id,
        verdict: submission.verdict,
        testCasesPassed: submission.testCasesPassed,
        totalTestCases: submission.totalTestCases,
        executionTime: submission.executionTime,
        score: submission.score,
        testCaseResults: testCaseResults.slice(0, problem.sampleTestCases), // Show only sample results
        errorMessage: submission.errorMessage
      }
    });

  } catch (error) {
    logger.error(`Submit code error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error during code execution'
    });
  }
};

// @desc    Get user submissions
// @route   GET /api/submissions/my
// @access  Private
exports.getMySubmissions = async (req, res) => {
  try {
    const { page = 1, limit = 20, problemId, verdict } = req.query;

    const query = { userId: req.user.id };

    if (problemId) {
      query.problemId = problemId;
    }

    if (verdict) {
      query.verdict = verdict;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const submissions = await Submission.find(query)
      .populate('problemId', 'title difficulty')
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit))
      .select('-code -testCaseResults');

    const total = await Submission.countDocuments(query);

    res.status(200).json({
      success: true,
      count: submissions.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: submissions
    });

  } catch (error) {
    logger.error(`Get my submissions error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get submission by ID
// @route   GET /api/submissions/:id
// @access  Private
exports.getSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id)
      .populate('problemId', 'title difficulty')
      .populate('userId', 'name');

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    // Check if user owns the submission or is admin
    if (submission.userId._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this submission'
      });
    }

    res.status(200).json({
      success: true,
      data: submission
    });

  } catch (error) {
    logger.error(`Get submission error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get all submissions (Admin)
// @route   GET /api/submissions/all
// @access  Private/Admin
exports.getAllSubmissions = async (req, res) => {
  try {
    const { page = 1, limit = 50, verdict, userId } = req.query;

    const query = {};

    if (verdict) {
      query.verdict = verdict;
    }

    if (userId) {
      query.userId = userId;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const submissions = await Submission.find(query)
      .populate('userId', 'name email')
      .populate('problemId', 'title difficulty')
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Submission.countDocuments(query);

    res.status(200).json({
      success: true,
      count: submissions.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: submissions
    });

  } catch (error) {
    logger.error(`Get all submissions error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
