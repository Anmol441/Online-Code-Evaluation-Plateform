# 🚀 Deployment & Testing Guide

## Complete Setup Instructions for VS Code

### Prerequisites Check

```bash
# Check Node.js version (should be 16+)
node --version

# Check npm version
npm --version

# Check MongoDB
mongod --version

# Check Docker
docker --version
```

### Step-by-Step Setup

#### 1. Open in VS Code

```bash
# Clone or download the project
cd code-evaluation-platform

# Open in VS Code
code .
```

#### 2. Backend Configuration

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file with your settings
# IMPORTANT: Update EMAIL_USER and EMAIL_PASSWORD for OTP emails
```

#### 3. Start MongoDB

```bash
# Option 1: Using MongoDB service
mongod

# Option 2: With custom data directory
mongod --dbpath /path/to/data

# Option 3: MongoDB Atlas (Cloud)
# Use connection string in MONGODB_URI
```

#### 4. Seed Sample Problems (Optional)

```bash
# While in backend directory
node seedProblems.js
```

This creates 5 sample problems:
- Two Sum (Easy)
- Palindrome Number (Easy)
- Merge Two Sorted Lists (Medium)
- Binary Tree Maximum Path Sum (Hard)
- Valid Parentheses (Easy)

#### 5. Start Backend Server

```bash
# Development mode with auto-reload
npm run dev

# Or production mode
npm start
```

Expected output:
```
Server running in development mode on port 5000
MongoDB Connected: localhost
Default admin user created
```

#### 6. Frontend Setup

Open a new VS Code terminal:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Browser should open automatically at `http://localhost:3000`

### 🧪 Testing the Application

#### Test 1: User Registration

1. Click "Get Started" or navigate to `/register`
2. Fill in:
   - Name: "John Doe"
   - Email: your-email@gmail.com
   - Password: "Test@123"
3. Check your email for OTP
4. Enter OTP to verify
5. You should be redirected to dashboard

#### Test 2: Admin Login

1. Navigate to `/login`
2. Use credentials:
   - Email: admin@codeplatform.com
   - Password: Admin@123
3. Access admin panel at `/admin`

#### Test 3: Solve a Problem

1. Go to "Problems" page
2. Select "Two Sum" problem
3. Write solution in any language
4. Submit code
5. View results

#### Test 4: View Dashboard

1. Navigate to `/dashboard`
2. Check statistics:
   - Problems solved
   - Submission history
   - Language usage
   - Streak data

#### Test 5: Leaderboard

1. Navigate to `/leaderboard`
2. View rankings
3. Filter by difficulty

### 🐳 Docker Setup for Code Execution

#### Pull Required Images

```bash
# C++ compiler
docker pull gcc:latest

# Java compiler
docker pull openjdk:17-slim

# Python interpreter
docker pull python:3.11-slim

# Node.js runtime
docker pull node:18-alpine
```

#### Verify Docker Images

```bash
docker images
```

Should show:
```
REPOSITORY   TAG          IMAGE ID       SIZE
gcc          latest       ...            1.2GB
openjdk      17-slim      ...            400MB
python       3.11-slim    ...            130MB
node         18-alpine    ...            110MB
```

#### Test Code Execution

```bash
# Backend should be running
# Submit any code through the UI
# Check logs for execution status
```

### 📝 Sample Test Code

#### C++ (Two Sum)
```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int main() {
    vector<int> nums;
    int n, target;
    
    while(cin >> n) nums.push_back(n);
    target = nums.back();
    nums.pop_back();
    
    unordered_map<int, int> map;
    for(int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if(map.count(complement)) {
            cout << map[complement] << " " << i;
            return 0;
        }
        map[nums[i]] = i;
    }
    return 0;
}
```

#### Python (Palindrome Number)
```python
def is_palindrome(x):
    if x < 0:
        return False
    return str(x) == str(x)[::-1]

x = int(input())
print("true" if is_palindrome(x) else "false")
```

#### JavaScript (Valid Parentheses)
```javascript
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (s) => {
    const stack = [];
    const pairs = {'(': ')', '[': ']', '{': '}'};
    
    for(let char of s) {
        if(pairs[char]) {
            stack.push(char);
        } else {
            if(stack.length === 0 || pairs[stack.pop()] !== char) {
                console.log('false');
                process.exit(0);
            }
        }
    }
    
    console.log(stack.length === 0 ? 'true' : 'false');
    rl.close();
});
```

### 🔧 Troubleshooting

#### Issue: MongoDB Connection Failed

```bash
# Check if MongoDB is running
ps aux | grep mongod

# Start MongoDB
mongod --dbpath /data/db

# Check connection string in .env
MONGODB_URI=mongodb://localhost:27017/code-evaluation-platform
```

#### Issue: Port 5000 Already in Use

```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or change port in backend/.env
PORT=5001
```

#### Issue: Email OTP Not Sending

1. Ensure Gmail 2FA is enabled
2. Generate App Password:
   - Google Account → Security → 2-Step Verification → App passwords
3. Use App Password in .env
4. Check EMAIL_USER and EMAIL_PASSWORD

#### Issue: Docker Containers Not Cleaning Up

```bash
# List all containers
docker ps -a

# Remove all stopped containers
docker container prune -f

# Remove specific containers
docker rm -f $(docker ps -aq)
```

#### Issue: Frontend Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install

# Clear React cache
rm -rf .cache
```

### 📊 Monitoring

#### Backend Logs

```bash
# View logs in real-time
tail -f backend/logs/combined.log

# View error logs
tail -f backend/logs/error.log
```

#### Docker Logs

```bash
# View container logs
docker logs <container-id>

# Follow logs
docker logs -f <container-id>
```

### 🔐 Security Checklist

- [ ] Change default admin password
- [ ] Update JWT_SECRET in .env
- [ ] Configure proper CORS origins
- [ ] Set up HTTPS in production
- [ ] Enable rate limiting
- [ ] Regular security updates
- [ ] Backup MongoDB regularly
- [ ] Monitor logs for suspicious activity

### 🚀 Production Deployment

#### Environment Setup

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET=<strong-random-string>
```

#### Build Frontend

```bash
cd frontend
npm run build
```

#### Serve Frontend

Option 1: Using Express
```javascript
app.use(express.static('frontend/build'));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
});
```

Option 2: Using Nginx
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        root /var/www/frontend/build;
        try_files $uri /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:5000;
    }
}
```

#### PM2 Process Manager

```bash
# Install PM2
npm install -g pm2

# Start backend
pm2 start backend/server.js --name "code-platform-api"

# Save configuration
pm2 save

# Auto-restart on reboot
pm2 startup
```

### 📈 Performance Tips

1. **Database Indexing**
   - Indexes are already defined in models
   - Monitor slow queries

2. **Caching**
   - Implement Redis for frequent queries
   - Cache problem lists

3. **Load Balancing**
   - Use Nginx for load balancing
   - Multiple backend instances with PM2

4. **CDN**
   - Serve static assets via CDN
   - Optimize images and fonts

### 🎯 Next Steps

1. Complete remaining frontend pages
2. Add more sample problems
3. Implement contest mode
4. Add discussion forum
5. Create mobile app
6. Implement AI hints
7. Add video tutorials

### 📞 Support

For issues and questions:
- Check logs in `backend/logs/`
- Review error messages
- Verify environment variables
- Test with Postman/curl
- Check Docker containers

### ✅ Success Indicators

Platform is working correctly when:
- ✅ Backend starts without errors
- ✅ Frontend connects to backend
- ✅ User can register and verify email
- ✅ Admin can access admin panel
- ✅ Code submissions execute successfully
- ✅ Test cases pass/fail correctly
- ✅ Leaderboard updates
- ✅ Dashboard shows statistics

---

**Happy Deploying! 🚀**
