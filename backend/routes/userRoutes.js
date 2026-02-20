const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  getDashboard,
  getLeaderboard,
  getUserById,
  getPersonalizedTips
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/dashboard', protect, getDashboard);
router.get('/leaderboard', getLeaderboard);
router.get('/tips', protect, getPersonalizedTips);
router.get('/:id', getUserById);

module.exports = router;
