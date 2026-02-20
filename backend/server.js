require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimiter');
const logger = require('./utils/logger');
const codeExecutor = require('./utils/codeExecutor');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Initialize express app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply rate limiting to all routes
app.use('/api', apiLimiter);

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/problems', require('./routes/problemRoutes'));
app.use('/api/submissions', require('./routes/submissionRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Code Evaluation Platform API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      problems: '/api/problems',
      submissions: '/api/submissions',
      users: '/api/users',
      admin: '/api/admin'
    }
  });
});

// Error handler middleware (must be last)
app.use(errorHandler);

// Create default admin user
const createDefaultAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@codeplatform.com';
    const adminExists = await User.findOne({ email: adminEmail });

    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: adminEmail,
        password: process.env.ADMIN_PASSWORD || 'Admin@123',
        role: 'admin',
        isVerified: true
      });
      logger.info('Default admin user created');
    }
  } catch (error) {
    logger.error(`Create admin error: ${error.message}`);
  }
};

// Pull Docker images on startup
const initializeDocker = async () => {
  try {
    logger.info('Initializing Docker images...');
    await codeExecutor.pullImages();
    logger.info('Docker images ready');
  } catch (error) {
    logger.error(`Docker initialization error: ${error.message}`);
    logger.warn('Code execution may not work properly without Docker images');
  }
};

// Start server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, async () => {
  logger.info(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  
  // Initialize on startup
  await createDefaultAdmin();
  
  // Uncomment below to pull Docker images on startup (takes time)
  // await initializeDocker();
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

module.exports = app;
