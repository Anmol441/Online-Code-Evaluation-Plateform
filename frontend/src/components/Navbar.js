import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Code2, LogOut, User, Trophy, LayoutDashboard, Shield, BookOpen } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <Code2 size={28} />
          <span>Code Platform</span>
        </Link>

        <div className="navbar-links">
          <Link to="/problems" className="nav-link">Problems</Link>
          <Link to="/leaderboard" className="nav-link">
            <Trophy size={18} />
            Leaderboard
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link">
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
              <Link to="/learning" className="nav-link">
                <BookOpen size={18} />
                Learning Hub
              </Link>
              {isAdmin && (
                <Link to="/admin" className="nav-link admin-link">
                  <Shield size={18} />
                  Admin
                </Link>
              )}
              <div className="user-menu">
                <button className="user-button">
                  <User size={18} />
                  {user?.name}
                </button>
                <div className="dropdown">
                  <Link to="/profile" className="dropdown-item">
                    <User size={16} />
                    Profile
                  </Link>
                  <button onClick={handleLogout} className="dropdown-item logout">
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-secondary">Login</Link>
              <Link to="/register" className="btn-primary">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
