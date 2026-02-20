const express = require('express');
const router = express.Router();
const {
  submitCode,
  getMySubmissions,
  getSubmission,
  getAllSubmissions
} = require('../controllers/submissionController');
const { protect, authorize, isVerified } = require('../middleware/auth');
const { submissionLimiter } = require('../middleware/rateLimiter');

router.post('/', protect, isVerified, submissionLimiter, submitCode);
router.get('/my', protect, getMySubmissions);
router.get('/all', protect, authorize('admin'), getAllSubmissions);
router.get('/:id', protect, getSubmission);

module.exports = router;
