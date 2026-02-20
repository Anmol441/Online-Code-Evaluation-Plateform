const express = require('express');
const router = express.Router();
const {
  getProblems,
  getProblem,
  createProblem,
  updateProblem,
  deleteProblem,
  getProblemStats
} = require('../controllers/problemController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getProblems);
router.get('/stats', getProblemStats);
router.get('/:id', getProblem);
router.post('/', protect, authorize('admin'), createProblem);
router.put('/:id', protect, authorize('admin'), updateProblem);
router.delete('/:id', protect, authorize('admin'), deleteProblem);

module.exports = router;
