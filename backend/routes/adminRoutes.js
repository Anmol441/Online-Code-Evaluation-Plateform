const express = require('express');
const router = express.Router();
const {
  getPlatformAnalytics,
  getAllUsers,
  toggleBlockUser,
  deleteUser,
  updateUserRole,
  getProblemWithTestCases
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect, authorize('admin'));

router.get('/analytics', getPlatformAnalytics);
router.get('/users', getAllUsers);
router.put('/users/:id/block', toggleBlockUser);
router.delete('/users/:id', deleteUser);
router.put('/users/:id/role', updateUserRole);
router.get('/problems/:id', getProblemWithTestCases);

module.exports = router;
