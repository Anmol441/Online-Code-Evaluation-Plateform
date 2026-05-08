const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger');

// ===============================
// PROTECT ROUTE
// ===============================
exports.protect = async (req, res, next) => {
  if (req.method === 'OPTIONS') return next();

  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: 'Your account has been blocked. Contact support.'
      });
    }

    req.user = user;
    next();

  } catch (error) {
    logger.error(`Auth middleware error: ${error.message}`);

    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

// ===============================
// EMAIL VERIFIED CHECK
// ===============================
exports.isVerified = (req, res, next) => {
  if (!req.user?.isVerified) {
    return res.status(403).json({
      success: false,
      message: 'Please verify your email first'
    });
  }
  next();
};

// ===============================
// ROLE AUTHORIZATION
// ===============================
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user.role}' is not authorized`
      });
    }

    next();
  };
};

// ===============================
// JWT GENERATOR
// ===============================
exports.generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || '7d'
    }
  );
};