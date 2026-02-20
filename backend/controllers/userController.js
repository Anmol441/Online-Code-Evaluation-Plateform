const User = require('../models/User');
const Submission = require('../models/Submission');
const logger = require('../utils/logger');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('solvedProblems.problemId', 'title difficulty slug');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {
    logger.error(`Get profile error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const { name, bio } = req.body;

    const fieldsToUpdate = {};
    if (name) fieldsToUpdate.name = name;
    if (bio !== undefined) fieldsToUpdate.bio = bio;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      fieldsToUpdate,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });

  } catch (error) {
    logger.error(`Update profile error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get user dashboard stats
// @route   GET /api/users/dashboard
// @access  Private
exports.getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // Get recent submissions
    const recentSubmissions = await Submission.find({ userId: req.user.id })
      .populate('problemId', 'title difficulty')
      .sort('-createdAt')
      .limit(10)
      .select('-code -testCaseResults');

    // Get submission stats by verdict
    const verdictStats = await Submission.aggregate([
      { $match: { userId: user._id } },
      {
        $group: {
          _id: '$verdict',
          count: { $sum: 1 }
        }
      }
    ]);

    // Calculate success rate
    const successRate = user.statistics.totalSubmissions > 0
      ? ((user.statistics.acceptedSubmissions / user.statistics.totalSubmissions) * 100).toFixed(2)
      : 0;

    res.status(200).json({
      success: true,
      data: {
        statistics: user.statistics,
        languageStats: user.languageStats,
        streakData: user.streakData,
        totalScore: user.totalScore,
        successRate,
        recentSubmissions,
        verdictStats
      }
    });

  } catch (error) {
    logger.error(`Get dashboard error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get leaderboard
// @route   GET /api/users/leaderboard
// @access  Public
exports.getLeaderboard = async (req, res) => {
  try {
    const { difficulty, limit = 50, page = 1 } = req.query;

    let sortField = 'totalScore';
    
    if (difficulty) {
      sortField = `statistics.${difficulty.toLowerCase()}`;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const users = await User.find({ isVerified: true, isBlocked: false })
      .select('name email totalScore statistics languageStats streakData')
      .sort(`-${sortField} -statistics.acceptedSubmissions`)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments({ isVerified: true, isBlocked: false });

    // Add rank
    const leaderboard = users.map((user, index) => ({
      rank: skip + index + 1,
      ...user.toObject()
    }));

    res.status(200).json({
      success: true,
      count: leaderboard.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: leaderboard
    });

  } catch (error) {
    logger.error(`Get leaderboard error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get user by ID (Public profile)
// @route   GET /api/users/:id
// @access  Public
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-otp -otpExpire -resetPasswordOTP -resetPasswordOTPExpire')
      .populate('solvedProblems.problemId', 'title difficulty slug');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {
    logger.error(`Get user by ID error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get personalized tips
// @route   GET /api/users/tips
// @access  Private
exports.getPersonalizedTips = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const tips = [];

    // Analyze weak areas
    const { easy, medium, hard, totalSubmissions, acceptedSubmissions } = user.statistics;
    const successRate = totalSubmissions > 0 ? (acceptedSubmissions / totalSubmissions) * 100 : 0;

    // Tip based on success rate
    if (successRate < 30) {
      tips.push({
        category: 'Practice',
        title: 'Focus on Fundamentals',
        message: 'Your success rate is low. Try solving more Easy problems to build a strong foundation.',
        action: 'Browse Easy Problems',
        actionLink: '/problems?difficulty=Easy'
      });
    }

    // Tip based on difficulty distribution
    if (easy < 10) {
      tips.push({
        category: 'Getting Started',
        title: 'Build Your Foundation',
        message: 'Start with Easy problems to understand basic patterns and build confidence.',
        action: 'Solve Easy Problems',
        actionLink: '/problems?difficulty=Easy'
      });
    } else if (easy >= 20 && medium < 10) {
      tips.push({
        category: 'Level Up',
        title: 'Ready for a Challenge?',
        message: "You've mastered Easy problems! It's time to tackle Medium difficulty challenges.",
        action: 'Try Medium Problems',
        actionLink: '/problems?difficulty=Medium'
      });
    } else if (medium >= 20 && hard < 5) {
      tips.push({
        category: 'Advanced',
        title: 'Push Your Limits',
        message: 'Great progress on Medium problems! Challenge yourself with Hard problems.',
        action: 'Explore Hard Problems',
        actionLink: '/problems?difficulty=Hard'
      });
    }

    // Language diversity tip
    const languageCount = Object.values(user.languageStats).filter(count => count > 0).length;
    if (languageCount === 1) {
      tips.push({
        category: 'Skills',
        title: 'Try Different Languages',
        message: 'Learning multiple programming languages enhances problem-solving skills.',
        action: 'Explore Languages',
        actionLink: '/problems'
      });
    }

    // Streak motivation
    if (user.streakData.currentStreak === 0) {
      tips.push({
        category: 'Motivation',
        title: 'Start a Solving Streak',
        message: 'Solve at least one problem daily to build momentum and improve consistently.',
        action: 'Start Today',
        actionLink: '/problems'
      });
    } else if (user.streakData.currentStreak >= 7) {
      tips.push({
        category: 'Achievement',
        title: 'Amazing Streak! 🔥',
        message: `You're on a ${user.streakData.currentStreak}-day streak! Keep going!`,
        action: 'Continue',
        actionLink: '/problems'
      });
    }

    // General tip based on total problems
    const totalSolved = easy + medium + hard;
    if (totalSolved === 0) {
      tips.push({
        category: 'Welcome',
        title: 'Start Your Coding Journey',
        message: 'Solve your first problem today and begin building your skills!',
        action: 'Get Started',
        actionLink: '/problems'
      });
    }

    res.status(200).json({
      success: true,
      data: tips.slice(0, 5) // Return top 5 tips
    });

  } catch (error) {
    logger.error(`Get tips error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
