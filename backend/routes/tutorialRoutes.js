const express = require('express');
const router = express.Router();
const Tutorial = require('../models/Tutorial');
const { protect, authorize } = require('../middleware/auth');

// =====================
// GET ALL (PUBLIC)
// =====================
router.get('/', async (req, res) => {
  try {
    const tutorials = await Tutorial.find().sort({ createdAt: -1 });
    res.json(tutorials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// =====================
// CREATE (ADMIN ONLY)
// =====================
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const tutorial = await Tutorial.create(req.body);
    res.status(201).json(tutorial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// =====================
// DELETE (ADMIN ONLY)
// =====================
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id);

    if (!tutorial) {
      return res.status(404).json({ message: 'Not found' });
    }

    await tutorial.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;