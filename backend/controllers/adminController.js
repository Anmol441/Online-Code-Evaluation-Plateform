const User = require('../models/User');
const Problem = require('../models/Problem');
const Submission = require('../models/Submission');
const logger = require('../utils/logger');

// @desc    Get platform analytics
// @route   GET /api/admin/analytics
// @access  Private/Admin
exports.getPlatformAnalytics = async (req, res) => {
  try {
    // Total users
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isVerified: true, isBlocked: false });
    const blockedUsers = await User.countDocuments({ isBlocked: true });

    // Total problems
    const totalProblems = await Problem.countDocuments();
    const problemsByDifficulty = await Problem.aggregate([
      {
        $group: {
          _id: '$difficulty',
          count: { $sum: 1 }
        }
      }
    ]);

    // Total submissions
    const totalSubmissions = await Submission.countDocuments();
    const submissionsByVerdict = await Submission.aggregate([
      {
        $group: {
          _id: '$verdict',
          count: { $sum: 1 }
        }
      }
    ]);

    // Recent activity
    const recentSubmissions = await Submission.find()
      .populate('userId', 'name email')
      .populate('problemId', 'title difficulty')
      .sort('-createdAt')
      .limit(20);

    // Top performers
    const topPerformers = await User.find({ isVerified: true })
      .select('name email totalScore statistics')
      .sort('-totalScore')
      .limit(10);

    // Most attempted problems
    const popularProblems = await Problem.find()
      .select('title difficulty totalSubmissions acceptanceRate')
      .sort('-totalSubmissions')
      .limit(10);

    res.status(200).json({
      success: true,
      data: {
        users: {
          total: totalUsers,
          active: activeUsers,
          blocked: blockedUsers
        },
        problems: {
          total: totalProblems,
          byDifficulty: problemsByDifficulty
        },
        submissions: {
          total: totalSubmissions,
          byVerdict: submissionsByVerdict
        },
        recentActivity: recentSubmissions,
        topPerformers,
        popularProblems
      }
    });

  } catch (error) {
    logger.error(`Get analytics error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 50, search, role, status } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    if (role) {
      query.role = role;
    }

    if (status === 'blocked') {
      query.isBlocked = true;
    } else if (status === 'active') {
      query.isBlocked = false;
      query.isVerified = true;
    } else if (status === 'unverified') {
      query.isVerified = false;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const users = await User.find(query)
      .select('-otp -otpExpire -resetPasswordOTP -resetPasswordOTPExpire')
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: users
    });

  } catch (error) {
    logger.error(`Get all users error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Block/Unblock user
// @route   PUT /api/admin/users/:id/block
// @access  Private/Admin
exports.toggleBlockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prevent blocking admin users
    if (user.role === 'admin') {
      return res.status(400).json({
        success: false,
        message: 'Cannot block admin users'
      });
    }

    user.isBlocked = !user.isBlocked;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User ${user.isBlocked ? 'blocked' : 'unblocked'} successfully`,
      data: user
    });

  } catch (error) {
    logger.error(`Toggle block user error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prevent deleting admin users
    if (user.role === 'admin') {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete admin users'
      });
    }

    // Delete user's submissions
    await Submission.deleteMany({ userId: user._id });

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });

  } catch (error) {
    logger.error(`Delete user error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update user role
// @route   PUT /api/admin/users/:id/role
// @access  Private/Admin
exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!role || !['user', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role'
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'User role updated successfully',
      data: user
    });

  } catch (error) {
    logger.error(`Update user role error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get problem with all test cases (Admin only)
// @route   GET /api/admin/problems/:id
// @access  Private/Admin
exports.getProblemWithTestCases = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }

    res.status(200).json({
      success: true,
      data: problem
    });

  } catch (error) {
    logger.error(`Get problem with test cases error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
