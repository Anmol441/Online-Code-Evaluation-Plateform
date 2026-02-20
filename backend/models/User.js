const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  profilePicture: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    maxlength: [200, 'Bio cannot exceed 200 characters'],
    default: ''
  },
  solvedProblems: [{
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Problem'
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard']
    },
    solvedAt: {
      type: Date,
      default: Date.now
    }
  }],
  totalScore: {
    type: Number,
    default: 0
  },
  statistics: {
    easy: { type: Number, default: 0 },
    medium: { type: Number, default: 0 },
    hard: { type: Number, default: 0 },
    totalSubmissions: { type: Number, default: 0 },
    acceptedSubmissions: { type: Number, default: 0 }
  },
  languageStats: {
    cpp: { type: Number, default: 0 },
    java: { type: Number, default: 0 },
    python: { type: Number, default: 0 },
    javascript: { type: Number, default: 0 }
  },
  streakData: {
    currentStreak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    lastSolvedDate: Date
  },
  otp: String,
  otpExpire: Date,
  resetPasswordOTP: String,
  resetPasswordOTPExpire: Date
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Update streak
userSchema.methods.updateStreak = function() {
  const today = new Date().setHours(0, 0, 0, 0);
  const lastSolved = this.streakData.lastSolvedDate 
    ? new Date(this.streakData.lastSolvedDate).setHours(0, 0, 0, 0) 
    : null;

  if (!lastSolved) {
    this.streakData.currentStreak = 1;
  } else {
    const dayDiff = Math.floor((today - lastSolved) / (1000 * 60 * 60 * 24));
    
    if (dayDiff === 0) {
      // Already solved today
      return;
    } else if (dayDiff === 1) {
      // Consecutive day
      this.streakData.currentStreak += 1;
    } else {
      // Streak broken
      this.streakData.currentStreak = 1;
    }
  }

  if (this.streakData.currentStreak > this.streakData.longestStreak) {
    this.streakData.longestStreak = this.streakData.currentStreak;
  }

  this.streakData.lastSolvedDate = new Date();
};

module.exports = mongoose.model('User', userSchema);
