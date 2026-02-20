#!/bin/bash

echo "🚀 Code Evaluation Platform - Quick Start"
echo "=========================================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi
echo "✅ Node.js installed: $(node --version)"

# Check MongoDB
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB not found. Please ensure MongoDB is installed and running."
fi

# Check Docker
if ! command -v docker &> /dev/null; then
    echo "⚠️  Docker not found. Code execution will not work without Docker."
else
    echo "✅ Docker installed: $(docker --version)"
fi

echo ""
echo "📦 Installing dependencies..."
echo ""

# Backend setup
echo "Setting up backend..."
cd backend
if [ ! -f ".env" ]; then
    echo "Creating .env file from example..."
    cp .env.example .env
    echo "⚠️  Please update .env with your configuration!"
fi
npm install
cd ..

# Frontend setup
echo "Setting up frontend..."
cd frontend
npm install
cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update backend/.env with your configuration"
echo "2. Start MongoDB: mongod"
echo "3. Start backend: cd backend && npm run dev"
echo "4. Start frontend: cd frontend && npm start"
echo "5. Open http://localhost:3000 in your browser"
echo ""
echo "🔑 Default admin credentials:"
echo "   Email: admin@codeplatform.com"
echo "   Password: Admin@123"
echo ""
echo "Happy coding! 🎉"
