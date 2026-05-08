// require('dotenv').config();

// const express = require('express');
// const cors = require('cors');

// const connectDB = require('./config/database');

// const errorHandler = require('./middleware/errorHandler');
// const { apiLimiter } = require('./middleware/rateLimiter');

// const app = express();


// // =====================
// // DATABASE CONNECTION
// // =====================
// connectDB();


// // =====================
// // CORS CONFIG
// // =====================
// app.use(cors({
//   origin: [
//     'http://localhost:3000',
//     'https://online-code-evaluation-platform.vercel.app'
//   ],
//   credentials: true
// }));


// // =====================
// // BODY PARSER
// // =====================
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// // =====================
// // API RATE LIMITER
// // =====================
// app.use('/api', apiLimiter);


// // =====================
// // ROUTES
// // =====================
// app.use('/api/auth', require('./routes/authRoutes'));

// app.use('/api/problems', require('./routes/problemRoutes'));

// app.use('/api/submissions', require('./routes/submissionRoutes'));

// app.use('/api/users', require('./routes/userRoutes'));

// app.use('/api/admin', require('./routes/adminRoutes'));

// app.use('/api/tutorials', require('./routes/tutorialRoutes'));

// app.use('/api/contact', require('./routes/contactRoutes'));


// // =====================
// // HEALTH CHECK ROUTE
// // =====================
// app.get('/api/health', (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: 'Server is running successfully 🚀'
//   });
// });


// // =====================
// // ROOT ROUTE
// // =====================
// app.get('/', (req, res) => {
//   res.send('Code Evaluation Backend API Running 🚀');
// });


// // =====================
// // ERROR HANDLER
// // =====================
// app.use(errorHandler);


// // =====================
// // SERVER START
// // =====================
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/database');

const errorHandler = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimiter');

const app = express();


// ======================
// DATABASE CONNECTION
// ======================
connectDB();


// ======================
// CORS
// ======================
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://online-code-evaluation-platform.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


// ======================
// BODY PARSER
// ======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ======================
// RATE LIMITER
// ======================
app.use('/api', apiLimiter);


// ======================
// ROUTES
// ======================
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/problems', require('./routes/problemRoutes'));
app.use('/api/submissions', require('./routes/submissionRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/tutorials', require('./routes/tutorialRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));


// ======================
// ROOT ROUTE
// ======================
app.get('/', (req, res) => {
  res.send('Backend Running 🚀');
});


// ======================
// HEALTH CHECK
// ======================
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API Working'
  });
});


// ======================
// ERROR HANDLER
// ======================
app.use(errorHandler);


// ======================
// SERVER
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
