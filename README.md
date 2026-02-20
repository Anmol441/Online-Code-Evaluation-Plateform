# 🚀 Online Code Evaluation Platform

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for practicing coding problems, similar to LeetCode and HackerRank.

## ✨ Features

### 🔐 Authentication & Security
- JWT-based authentication
- Email OTP verification
- Password reset via OTP
- Role-based access control (User/Admin)
- Rate limiting for API endpoints
- Bcrypt password hashing
- Secure session management

### 👤 User Management
- User profiles with statistics
- Submission history tracking
- Problem-solving streaks
- Language usage analytics
- Personalized coding tips
- Dashboard with progress visualization

### 🧠 Coding Platform
- Problem listing with difficulty filters (Easy, Medium, Hard)
- Detailed problem descriptions with test cases
- Code editor with syntax highlighting
- Multi-language support (C++, Java, Python, JavaScript)
- Real-time code execution
- Comprehensive verdict system (AC, WA, TLE, CE, RE)

### 🐳 Code Execution Engine
- Docker-based isolated execution
- Time and memory limit enforcement
- Security through containerization
- Auto-cleanup of containers
- Language-specific Docker images

### 🏆 Leaderboard & Analytics
- Global and difficulty-wise rankings
- User performance metrics
- Success rate tracking
- Submission statistics

### 🛠 Admin Panel
- Problem management (CRUD operations)
- Test case management
- User management (block/unblock)
- Platform analytics dashboard
- Execution limit controls

### 💡 Intelligent Features
- Personalized tips based on user performance
- Problem recommendations
- Weak area identification
- Streak tracking and motivation

## 🏗 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Nodemailer** - Email service
- **Dockerode** - Docker integration
- **Winston** - Logging

### Frontend
- **React.js** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Monaco Editor** - Code editor
- **React Toastify** - Notifications
- **Lucide React** - Icons
- **Recharts** - Data visualization

### DevOps
- **Docker** - Containerization
- **Git** - Version control

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **MongoDB** (v4.4 or higher)
- **Docker** (for code execution)
- **Git**
- **npm** or **yarn**

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd code-evaluation-platform
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Environment Configuration

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/code-evaluation-platform

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRE=7d

# Email (Gmail example)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password

# OTP
OTP_EXPIRE_MINUTES=10

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Code Execution
CODE_EXECUTION_TIMEOUT=10000
MEMORY_LIMIT=256m
DOCKER_CLEANUP_ENABLED=true

# Admin
ADMIN_EMAIL=admin@codeplatform.com
ADMIN_PASSWORD=Admin@123
```

### 4. Gmail Setup for Email OTP

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Select "Mail" and your device
   - Copy the generated password
3. Use this password in `EMAIL_PASSWORD` in `.env`

### 5. Docker Setup

Pull required Docker images:

```bash
docker pull gcc:latest
docker pull openjdk:17-slim
docker pull python:3.11-slim
docker pull node:18-alpine
```

Or let the server pull them on startup (takes time on first run).

### 6. Start MongoDB

```bash
# If MongoDB is not running
mongod --dbpath /path/to/your/data/directory
```

### 7. Start Backend Server

```bash
cd backend
npm run dev
```

The backend will run on `http://localhost:5000`

### 8. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

### 9. Start Frontend

```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
code-evaluation-platform/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── problemController.js
│   │   ├── submissionController.js
│   │   ├── userController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── rateLimiter.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Problem.js
│   │   └── Submission.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── problemRoutes.js
│   │   ├── submissionRoutes.js
│   │   ├── userRoutes.js
│   │   └── adminRoutes.js
│   ├── utils/
│   │   ├── codeExecutor.js
│   │   ├── emailService.js
│   │   └── logger.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── PrivateRoute.js
│   │   │   └── AdminRoute.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Problems.js
│   │   │   ├── ProblemDetail.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Leaderboard.js
│   │   │   └── AdminDashboard.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
└── README.md
```

## 🔑 Default Admin Credentials

```
Email: admin@codeplatform.com
Password: Admin@123
```

**⚠️ Change these credentials after first login!**

## 📝 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/verify-email` - Verify email with OTP
- `POST /api/auth/resend-otp` - Resend verification OTP
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with OTP
- `GET /api/auth/me` - Get current user (Protected)
- `POST /api/auth/logout` - Logout user (Protected)

### Problem Endpoints

- `GET /api/problems` - Get all problems
- `GET /api/problems/:id` - Get problem by ID
- `GET /api/problems/stats` - Get problem statistics
- `POST /api/problems` - Create problem (Admin)
- `PUT /api/problems/:id` - Update problem (Admin)
- `DELETE /api/problems/:id` - Delete problem (Admin)

### Submission Endpoints

- `POST /api/submissions` - Submit code (Protected)
- `GET /api/submissions/my` - Get user's submissions (Protected)
- `GET /api/submissions/:id` - Get submission by ID (Protected)
- `GET /api/submissions/all` - Get all submissions (Admin)

### User Endpoints

- `GET /api/users/profile` - Get user profile (Protected)
- `PUT /api/users/profile` - Update profile (Protected)
- `GET /api/users/dashboard` - Get dashboard data (Protected)
- `GET /api/users/leaderboard` - Get leaderboard
- `GET /api/users/tips` - Get personalized tips (Protected)
- `GET /api/users/:id` - Get user by ID

### Admin Endpoints

- `GET /api/admin/analytics` - Platform analytics (Admin)
- `GET /api/admin/users` - Get all users (Admin)
- `PUT /api/admin/users/:id/block` - Block/Unblock user (Admin)
- `DELETE /api/admin/users/:id` - Delete user (Admin)
- `PUT /api/admin/users/:id/role` - Update user role (Admin)

## 🎯 Usage Guide

### For Users

1. **Register**: Create an account with email verification
2. **Browse Problems**: Explore coding challenges by difficulty
3. **Solve Problems**: Write and submit code in your preferred language
4. **Track Progress**: Monitor your statistics and streaks
5. **Compete**: Check your rank on the leaderboard

### For Admins

1. **Login** with admin credentials
2. **Add Problems**: Create new coding challenges with test cases
3. **Manage Users**: Block/unblock users, manage roles
4. **View Analytics**: Monitor platform usage and statistics
5. **Moderate Content**: Update or remove problems as needed

## 🐳 Docker Commands

```bash
# List running containers
docker ps

# View logs
docker logs <container-id>

# Clean up stopped containers
docker container prune

# Remove all code execution containers
docker ps -a | grep gcc | awk '{print $1}' | xargs docker rm -f
```

## 🔧 Troubleshooting

### Backend Issues

**MongoDB Connection Error:**
```bash
# Check if MongoDB is running
mongod --version
# Start MongoDB
mongod --dbpath /data/db
```

**Docker Issues:**
```bash
# Check Docker status
docker --version
docker ps

# Restart Docker service
sudo systemctl restart docker
```

**Port Already in Use:**
```bash
# Find process using port 5000
lsof -i :5000
# Kill the process
kill -9 <PID>
```

### Frontend Issues

**Dependencies Error:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

**Build Errors:**
```bash
# Clear cache
npm cache clean --force
npm install
```

## 🚦 Testing the Platform

1. Start both backend and frontend
2. Navigate to `http://localhost:3000`
3. Register a new account
4. Verify email with OTP
5. Browse and solve problems
6. Check dashboard for statistics

## 🔒 Security Features

- Password hashing with bcrypt (10 rounds)
- JWT token-based authentication
- HTTP-only cookies for tokens
- Rate limiting on sensitive endpoints
- Input validation and sanitization
- Docker container isolation for code execution
- No system call access in code execution
- Auto-cleanup of execution containers

## 📊 Features to Add (Optional)

- [ ] Social authentication (Google, GitHub)
- [ ] Code sharing and discussions
- [ ] Contest/Competition mode
- [ ] Video tutorials
- [ ] IDE integration
- [ ] Mobile app
- [ ] AI-powered hints
- [ ] Peer code review

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ for the coding community

## 🙏 Acknowledgments

- Inspired by LeetCode, HackerRank, and CodeChef
- React and Node.js communities
- Docker for containerization

---

**Happy Coding! 🚀**
