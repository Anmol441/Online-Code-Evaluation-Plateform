import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; // ✅ FIX
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Problems from './pages/Problems';
import ProblemDetail from './pages/ProblemDetail';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import Submissions from './pages/Submissions';
import AdminDashboard from './pages/AdminDashboard';
import AddProblem from './pages/AddProblem';
import LearningHub from './pages/LearningHub';
import About from './pages/About';
import ContactUS from './pages/ContactUS';

import './App.css';
import AddTutorial from './pages/AddTutorial';
import AdminContacts from './pages/AdminContacts';


// ✅ CREATE INNER COMPONENT (so we can use useAuth safely)
const AppContent = () => {
  const { user } = useAuth(); // ✅ FIX HERE

  return (
    <div className="App">
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUS />} />

        {/* Protected Routes */}
        <Route
          path="/problems/:id"
          element={
            <PrivateRoute>
              <ProblemDetail />
            </PrivateRoute>
          }
        />

        {/* ✅ ROLE BASED DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            user?.role === 'admin'
              ? <Navigate to="/admin" replace />
              : <Dashboard />
          }
        />

        <Route
          path="/admin"
          element={
            user?.role === 'admin'
              ? <AdminDashboard />
              : <Navigate to="/dashboard" replace />
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
  path="/admin/add-tutorial"
  element={
    <AdminRoute>
      <AddTutorial />
    </AdminRoute>
  }
/>


<Route
  path="/admin/AdminContacts"
  element={
    <AdminRoute>
      <AdminContacts />
    </AdminRoute>
  }
/>

        <Route
          path="/submissions"
          element={
            <PrivateRoute>
              <Submissions />
            </PrivateRoute>
          }
        />

        <Route
          path="/learning"
          element={
            <PrivateRoute>
              <LearningHub />
            </PrivateRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/add-problem"
          element={
            <AdminRoute>
              <AddProblem />
            </AdminRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="light"
      />
    </div>
  );
};


// ✅ MAIN APP (UNCHANGED STRUCTURE)
function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent /> {/* ✅ wrapped */}
      </Router>
    </AuthProvider>
  );
}

export default App;