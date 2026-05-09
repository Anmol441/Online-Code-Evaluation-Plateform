require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimiter');

const app = express();

// =====================
// DB CONNECTION
// =====================
connectDB();

// =====================
// CORS CONFIG
// =====================
const allowedOrigins = [
  'http://localhost:3000',
  'https://online-code-evaluation-plateform-production.up.railway.app',
  'https://online-code-evaluation-platform-uldtbxk1k.vercel.app',
  'https://online-code-evaluation-platform-np8fb7fii.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {

    // allow requests with no origin
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },

  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// =====================
// BODY PARSER
// =====================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =====================
// RATE LIMIT
// =====================
app.use('/api', apiLimiter);

// =====================
// ROUTES
// =====================
app.use('/api/tutorials', require('./routes/tutorialRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/problems', require('./routes/problemRoutes'));
app.use('/api/submissions', require('./routes/submissionRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

// =====================
// HEALTH CHECK
// =====================
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server running' });
});

// =====================
// ROOT TEST
// =====================
app.get('/', (req, res) => {
  res.send('API WORKING');
});

// =====================
// ERROR HANDLER
// =====================
app.use(errorHandler);

// =====================
// START SERVER
// =====================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
