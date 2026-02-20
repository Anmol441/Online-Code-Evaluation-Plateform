# 📘 Project Architecture & Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         React Frontend (Port 3000)                   │   │
│  │  - React Router for navigation                       │   │
│  │  - Context API for state management                  │   │
│  │  - Axios for API calls                               │   │
│  │  - Monaco Editor for code editing                    │   │
│  └─────────────────────────────────────────────────────┘   │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP/REST
┌──────────────────────▼──────────────────────────────────────┐
│                      API Gateway                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │    Express.js Backend (Port 5000)                    │   │
│  │  - RESTful API endpoints                             │   │
│  │  - JWT authentication                                │   │
│  │  - Rate limiting                                     │   │
│  │  - Error handling                                    │   │
│  └─────────────────────────────────────────────────────┘   │
└──────────┬────────────────────────┬─────────────────────────┘
           │                        │
           │                        │
┌──────────▼────────┐    ┌──────────▼──────────┐
│   MongoDB         │    │  Docker Engine      │
│   Database        │    │  Code Execution     │
│                   │    │                     │
│ - Users           │    │ - gcc:latest        │
│ - Problems        │    │ - openjdk:17        │
│ - Submissions     │    │ - python:3.11       │
│                   │    │ - node:18           │
└───────────────────┘    └─────────────────────┘
```

## Technology Stack Details

### Backend Technologies

#### Core Framework
- **Express.js 4.18.2**: Web application framework
  - Fast, unopinionated framework
  - Robust routing
  - Middleware support
  - HTTP utility methods

#### Database
- **MongoDB**: NoSQL database
  - Document-oriented storage
  - Flexible schema
  - High performance
  - Horizontal scalability

- **Mongoose 7.5.0**: MongoDB ODM
  - Schema validation
  - Middleware (hooks)
  - Query building
  - Population (joins)

#### Authentication & Security
- **JWT (jsonwebtoken 9.0.2)**: Token-based authentication
  - Stateless authentication
  - Secure token generation
  - Token expiration handling

- **Bcrypt.js 2.4.3**: Password hashing
  - Salted password hashing
  - Configurable work factor
  - Rainbow table protection

- **Express Rate Limit 6.10.0**: API rate limiting
  - Request throttling
  - DDoS protection
  - Customizable limits

#### Code Execution
- **Dockerode 3.3.5**: Docker API client
  - Container lifecycle management
  - Stream handling
  - Resource limits
  - Isolation and security

#### Email Service
- **Nodemailer 6.9.4**: Email sending
  - SMTP transport
  - HTML email templates
  - Attachment support
  - OAuth2 authentication

#### Logging
- **Winston 3.10.0**: Logging library
  - Multiple transports
  - Log levels
  - File rotation
  - Error tracking

### Frontend Technologies

#### UI Framework
- **React 18.2.0**: UI library
  - Component-based architecture
  - Virtual DOM
  - Hooks API
  - Context API

- **React Router 6.15.0**: Client-side routing
  - Nested routes
  - Protected routes
  - URL parameters
  - Navigation guards

#### HTTP Client
- **Axios 1.5.0**: Promise-based HTTP client
  - Request/response interceptors
  - Automatic JSON transformation
  - Timeout handling
  - Error handling

#### Code Editor
- **Monaco Editor 4.5.2**: VS Code's editor
  - Syntax highlighting
  - IntelliSense
  - Multi-language support
  - Customizable themes

#### UI Components
- **React Toastify 9.1.3**: Toast notifications
  - Customizable notifications
  - Multiple positions
  - Auto-dismiss
  - Animation support

- **Lucide React 0.263.1**: Icon library
  - Lightweight SVG icons
  - Customizable
  - Tree-shakeable
  - Consistent design

#### Data Visualization
- **Recharts 2.8.0**: Chart library
  - Responsive charts
  - Multiple chart types
  - Customizable
  - Declarative API

## Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique, indexed),
  password: String (hashed),
  role: String (enum: user, admin),
  isVerified: Boolean,
  isBlocked: Boolean,
  solvedProblems: [{
    problemId: ObjectId,
    difficulty: String,
    solvedAt: Date
  }],
  statistics: {
    easy: Number,
    medium: Number,
    hard: Number,
    totalSubmissions: Number,
    acceptedSubmissions: Number
  },
  languageStats: {
    cpp: Number,
    java: Number,
    python: Number,
    javascript: Number
  },
  streakData: {
    currentStreak: Number,
    longestStreak: Number,
    lastSolvedDate: Date
  },
  totalScore: Number,
  timestamps: true
}
```

### Problem Model
```javascript
{
  title: String (unique),
  slug: String (auto-generated),
  description: String,
  difficulty: String (enum: Easy, Medium, Hard),
  tags: [String],
  constraints: String,
  inputFormat: String,
  outputFormat: String,
  testCases: [{
    input: String,
    output: String,
    isSample: Boolean,
    explanation: String
  }],
  timeLimit: Number (ms),
  memoryLimit: Number (MB),
  points: Number,
  acceptanceRate: Number,
  totalSubmissions: Number,
  acceptedSubmissions: Number,
  starterCode: {
    cpp: String,
    java: String,
    python: String,
    javascript: String
  },
  hints: [String],
  companies: [String],
  isActive: Boolean,
  timestamps: true
}
```

### Submission Model
```javascript
{
  userId: ObjectId (ref: User),
  problemId: ObjectId (ref: Problem),
  language: String (enum: cpp, java, python, javascript),
  code: String,
  verdict: String (enum: Accepted, Wrong Answer, TLE, MLE, RE, CE),
  executionTime: Number (ms),
  memoryUsed: Number (KB),
  testCasesPassed: Number,
  totalTestCases: Number,
  errorMessage: String,
  testCaseResults: [{
    testCaseId: ObjectId,
    passed: Boolean,
    input: String,
    expectedOutput: String,
    actualOutput: String,
    executionTime: Number,
    error: String
  }],
  score: Number,
  isFirstAccepted: Boolean,
  timestamps: true
}
```

## API Endpoints

### Authentication (`/api/auth`)
```
POST   /register           - Register new user
POST   /verify-email       - Verify email with OTP
POST   /resend-otp         - Resend verification OTP
POST   /login              - Login user
POST   /forgot-password    - Request password reset
POST   /reset-password     - Reset password with OTP
GET    /me                 - Get current user (Protected)
POST   /logout             - Logout user (Protected)
```

### Problems (`/api/problems`)
```
GET    /                   - List all problems
GET    /:id                - Get problem details
GET    /stats              - Get problem statistics
POST   /                   - Create problem (Admin)
PUT    /:id                - Update problem (Admin)
DELETE /:id                - Delete problem (Admin)
```

### Submissions (`/api/submissions`)
```
POST   /                   - Submit code (Protected)
GET    /my                 - Get user's submissions (Protected)
GET    /:id                - Get submission details (Protected)
GET    /all                - Get all submissions (Admin)
```

### Users (`/api/users`)
```
GET    /profile            - Get user profile (Protected)
PUT    /profile            - Update profile (Protected)
GET    /dashboard          - Get dashboard data (Protected)
GET    /leaderboard        - Get leaderboard
GET    /tips               - Get personalized tips (Protected)
GET    /:id                - Get user by ID
```

### Admin (`/api/admin`)
```
GET    /analytics          - Platform analytics (Admin)
GET    /users              - Get all users (Admin)
PUT    /users/:id/block    - Block/unblock user (Admin)
DELETE /users/:id          - Delete user (Admin)
PUT    /users/:id/role     - Update user role (Admin)
GET    /problems/:id       - Get problem with all test cases (Admin)
```

## Code Execution Flow

```
1. User submits code
   ↓
2. Backend receives submission
   ↓
3. Create temporary directory
   ↓
4. Write code to file
   ↓
5. Create Docker container with:
   - Language-specific image
   - Code volume mount
   - Resource limits (CPU, Memory)
   - Network isolation
   ↓
6. Compile code (if needed)
   ↓
7. For each test case:
   - Execute code with input
   - Capture output
   - Measure execution time
   - Compare with expected output
   ↓
8. Determine verdict:
   - Accepted: All test cases pass
   - Wrong Answer: Output mismatch
   - TLE: Exceeds time limit
   - MLE: Exceeds memory limit
   - RE: Runtime error
   - CE: Compilation error
   ↓
9. Clean up:
   - Stop container
   - Remove container
   - Delete temporary files
   ↓
10. Return results to user
```

## Security Measures

### Authentication Security
- JWT tokens with expiration
- Secure password hashing (bcrypt, 10 rounds)
- Email verification required
- Password reset via OTP only
- Token blacklisting on logout

### API Security
- Rate limiting on all endpoints
- Stricter limits on auth endpoints
- Request validation
- Error message sanitization
- CORS configuration

### Code Execution Security
- Docker container isolation
- No network access for containers
- CPU and memory limits
- Time limit enforcement
- No system call access
- Auto-cleanup of containers
- Sandboxed environment

### Input Validation
- MongoDB injection prevention
- XSS protection
- SQL injection protection (N/A for NoSQL)
- Request size limits
- File upload restrictions

## Performance Optimizations

### Database
- Indexed fields (email, slug)
- Efficient queries with projection
- Aggregation pipelines
- Connection pooling

### API
- Response caching potential
- Pagination for large datasets
- Selective field return
- Compression middleware

### Code Execution
- Container reuse potential
- Parallel test case execution
- Resource limit optimization
- Cleanup batching

## Monitoring & Logging

### Application Logs
- Winston logger with levels:
  - error: Critical errors
  - warn: Warning messages
  - info: General information
  - debug: Debug information

### Log Files
- `combined.log`: All logs
- `error.log`: Error logs only
- Log rotation (5MB per file, 5 files)

### Metrics to Monitor
- API response times
- Database query times
- Code execution times
- Error rates
- User activity
- Submission statistics

## Scalability Considerations

### Horizontal Scaling
- Stateless API design
- JWT for authentication
- Load balancer compatible
- Multiple backend instances

### Database Scaling
- MongoDB replica sets
- Sharding for large datasets
- Read replicas for analytics

### Code Execution Scaling
- Separate execution service
- Queue-based job processing
- Distributed Docker hosts
- Auto-scaling based on load

## Future Enhancements

### Technical
- [ ] Redis caching layer
- [ ] Message queue (RabbitMQ/Kafka)
- [ ] Microservices architecture
- [ ] GraphQL API
- [ ] WebSocket for real-time updates
- [ ] CDN integration
- [ ] Multi-region deployment

### Features
- [ ] Contest mode
- [ ] Discussion forum
- [ ] Video tutorials
- [ ] AI-powered hints
- [ ] Code review system
- [ ] Social features
- [ ] Mobile applications
- [ ] IDE plugins

## Development Best Practices

### Code Organization
- Modular structure
- Separation of concerns
- DRY principle
- Clean code standards

### Error Handling
- Centralized error handler
- Descriptive error messages
- Proper HTTP status codes
- Error logging

### Testing
- Unit tests recommended
- Integration tests recommended
- API testing with Postman
- Load testing

### Version Control
- Git for version control
- Feature branch workflow
- Meaningful commit messages
- Pull request reviews

## Deployment Checklist

- [ ] Environment variables configured
- [ ] MongoDB connection verified
- [ ] Docker images pulled
- [ ] Email service configured
- [ ] Admin user created
- [ ] Sample problems loaded
- [ ] Frontend built
- [ ] HTTPS enabled
- [ ] Monitoring setup
- [ ] Backup strategy
- [ ] Security audit
- [ ] Performance testing

---

**Project Status**: Production-Ready Backend ✅ | Frontend Template Ready 📝
