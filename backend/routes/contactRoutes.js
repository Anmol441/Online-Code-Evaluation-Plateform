const express = require('express');

const router = express.Router();

const {
  sendMessage,
  getAllMessages,
  replyMessage
} = require('../controllers/contactController');

router.post('/', sendMessage);

router.get('/', getAllMessages);

router.put('/:id/reply', replyMessage);

module.exports = router;