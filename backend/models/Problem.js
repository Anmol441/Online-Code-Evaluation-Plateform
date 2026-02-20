const mongoose = require('mongoose');

const testCaseSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true
  },
  output: {
    type: String,
    required: true
  },
  isSample: {
    type: Boolean,
    default: false
  },
  explanation: String
});

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a problem title'],
    trim: true,
    unique: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a problem description']
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  constraints: {
    type: String,
    required: true
  },
  inputFormat: {
    type: String,
    required: true
  },
  outputFormat: {
    type: String,
    required: true
  },
  testCases: [testCaseSchema],
  sampleTestCases: {
    type: Number,
    default: 2
  },
  timeLimit: {
    type: Number,
    default: 2000, // milliseconds
    min: 1000,
    max: 10000
  },
  memoryLimit: {
    type: Number,
    default: 256, // MB
    min: 128,
    max: 512
  },
  points: {
    type: Number,
    default: function() {
      switch(this.difficulty) {
        case 'Easy': return 10;
        case 'Medium': return 20;
        case 'Hard': return 30;
        default: return 10;
      }
    }
  },
  acceptanceRate: {
    type: Number,
    default: 0
  },
  totalSubmissions: {
    type: Number,
    default: 0
  },
  acceptedSubmissions: {
    type: Number,
    default: 0
  },
  starterCode: {
    cpp: { type: String, default: '' },
    java: { type: String, default: '' },
    python: { type: String, default: '' },
    javascript: { type: String, default: '' }
  },
  hints: [{
    type: String
  }],
  companies: [{
    type: String
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Create slug from title
problemSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Update acceptance rate
problemSchema.methods.updateAcceptanceRate = function() {
  if (this.totalSubmissions > 0) {
    this.acceptanceRate = ((this.acceptedSubmissions / this.totalSubmissions) * 100).toFixed(2);
  }
};

module.exports = mongoose.model('Problem', problemSchema);
