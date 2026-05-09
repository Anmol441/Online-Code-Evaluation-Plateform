require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimiter');

const app = express();

// =====================
// DATABASE
// =====================
connectDB();

// =====================
// CORS FIX
// =====================
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://online-code-evaluation-plateform-production-a92f.up.railway.app',
    // 'https://online-code-evaluation-platform.vercel.app'
  ],
  credentials: true,
}));

// =====================
// BODY PARSER
// =====================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =====================
// RATE LIMITER
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
// TEST ROUTE
// =====================
app.get('/', (req, res) => {
  res.send('API WORKING');
});

app.get('/api/health', (req, res) => {
  res.json({ message: 'Server running' });
});

// =====================
// ERROR HANDLER
// =====================
app.use(errorHandler);

// =====================
// SERVER
// =====================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
