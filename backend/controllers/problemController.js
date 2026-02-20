const Problem = require('../models/Problem');
const logger = require('../utils/logger');

// @desc    Get all problems
// @route   GET /api/problems
// @access  Public
exports.getProblems = async (req, res) => {
  try {
    const { difficulty, tag, search, sort = '-createdAt', page = 1, limit = 20 } = req.query;

    // Build query
    const query = { isActive: true };

    if (difficulty) {
      query.difficulty = difficulty;
    }

    if (tag) {
      query.tags = { $in: [tag] };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const problems = await Problem.find(query)
      .select('-testCases')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Problem.countDocuments(query);

    res.status(200).json({
      success: true,
      count: problems.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: problems
    });

  } catch (error) {
    logger.error(`Get problems error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single problem
// @route   GET /api/problems/:id
// @access  Public
exports.getProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }

    // Return only sample test cases to users
    const problemData = problem.toObject();
    problemData.testCases = problem.testCases.filter(tc => tc.isSample);

    res.status(200).json({
      success: true,
      data: problemData
    });

  } catch (error) {
    logger.error(`Get problem error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create problem
// @route   POST /api/problems
// @access  Private/Admin
exports.createProblem = async (req, res) => {
  try {
    req.body.createdBy = req.user.id;

    const problem = await Problem.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Problem created successfully',
      data: problem
    });

  } catch (error) {
    logger.error(`Create problem error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update problem
// @route   PUT /api/problems/:id
// @access  Private/Admin
exports.updateProblem = async (req, res) => {
  try {
    let problem = await Problem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }

    problem = await Problem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Problem updated successfully',
      data: problem
    });

  } catch (error) {
    logger.error(`Update problem error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete problem
// @route   DELETE /api/problems/:id
// @access  Private/Admin
exports.deleteProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }

    await problem.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Problem deleted successfully'
    });

  } catch (error) {
    logger.error(`Delete problem error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get problem statistics
// @route   GET /api/problems/stats
// @access  Public
exports.getProblemStats = async (req, res) => {
  try {
    const stats = await Problem.aggregate([
      {
        $match: { isActive: true }
      },
      {
        $group: {
          _id: '$difficulty',
          count: { $sum: 1 },
          avgAcceptanceRate: { $avg: '$acceptanceRate' }
        }
      }
    ]);

    const totalProblems = await Problem.countDocuments({ isActive: true });

    res.status(200).json({
      success: true,
      data: {
        total: totalProblems,
        byDifficulty: stats
      }
    });

  } catch (error) {
    logger.error(`Get problem stats error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
