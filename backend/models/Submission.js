const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem',
    required: true
  },
  language: {
    type: String,
    enum: ['cpp', 'java', 'python', 'javascript'],
    required: true
  },
  code: {
    type: String,
    required: true
  },
  verdict: {
    type: String,
    enum: ['Accepted', 'Wrong Answer', 'Time Limit Exceeded', 'Memory Limit Exceeded', 
           'Runtime Error', 'Compilation Error', 'Pending'],
    default: 'Pending'
  },
  executionTime: {
    type: Number, // in milliseconds
    default: 0
  },
  memoryUsed: {
    type: Number, // in KB
    default: 0
  },
  testCasesPassed: {
    type: Number,
    default: 0
  },
  totalTestCases: {
    type: Number,
    required: true
  },
  errorMessage: {
    type: String,
    default: ''
  },
  testCaseResults: [{
    testCaseId: mongoose.Schema.Types.ObjectId,
    passed: Boolean,
    input: String,
    expectedOutput: String,
    actualOutput: String,
    executionTime: Number,
    error: String
  }],
  score: {
    type: Number,
    default: 0
  },
  isFirstAccepted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for faster queries
submissionSchema.index({ userId: 1, problemId: 1, createdAt: -1 });
submissionSchema.index({ verdict: 1 });

module.exports = mongoose.model('Submission', submissionSchema);
