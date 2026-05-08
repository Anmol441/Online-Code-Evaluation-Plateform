import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import {
  Code2,
  LogOut,
  User,
  Trophy,
  LayoutDashboard,
  Shield,
  BookOpen,
  Info,
  Mail
} from 'lucide-react';

import './Navbar.css';

const Navbar = () => {

  const {
    user,
    logout,
    isAuthenticated,
    isAdmin
  } = useAuth();

  const navigate = useNavigate();


  // ==========================
  // LOGOUT
  // ==========================
  const handleLogout = () => {

    logout();

    navigate('/login');
  };


  return (

    <nav className="navbar">

      <div className="navbar-container">

        {/* ========================== */}
        {/* LOGO */}
        {/* ========================== */}
        <Link to="/" className="navbar-brand">

          <Code2 size={28} />

          <span>
            CodeEval Platform
          </span>

        </Link>


        {/* ========================== */}
        {/* NAV LINKS */}
        {/* ========================== */}
        <div className="navbar-links">


          {/* ========================== */}
          {/* USER + GUEST ONLY */}
          {/* ========================== */}
          {(!user || user.role !== 'admin') && (
            <>

              <Link to="/about" className="nav-link">

                <Info size={18} />

                About Us

              </Link>


              <Link to="/contact" className="nav-link">

                <Mail size={18} />

                Contact Us

              </Link>

            </>
          )}


          {/* ========================== */}
          {/* PROBLEMS */}
          {/* ========================== */}
          <Link to="/problems" className="nav-link">

            <Code2 size={18} />

            Problems

          </Link>


          {/* ========================== */}
          {/* LEADERBOARD */}
          {/* ========================== */}
          <Link to="/leaderboard" className="nav-link">

            <Trophy size={18} />

            Leaderboard

          </Link>


          {/* ========================== */}
          {/* AUTHENTICATED USER */}
          {/* ========================== */}
          {isAuthenticated ? (

            <>

              {/* DASHBOARD */}
              <Link to="/dashboard" className="nav-link">

                <LayoutDashboard size={18} />

                Dashboard

              </Link>


              {/* LEARNING HUB */}
              <Link to="/learning" className="nav-link">

                <BookOpen size={18} />

                Learning Hub

              </Link>


              {/* ========================== */}
              {/* ADMIN ONLY */}
              {/* ========================== */}
              {user?.role === 'admin' && (

                <Link
                  to="/admin/AdminContacts"
                  className="nav-link admin-link"
                >

                  <Shield size={18} />

                  See Queries

                </Link>

              )}


              {/* ========================== */}
              {/* USER MENU */}
              {/* ========================== */}
              <div className="user-menu">

                <button className="user-button">

                  <User size={18} />

                  {user?.name}

                </button>


                {/* DROPDOWN */}
                <div className="dropdown">

                  <Link
                    to="/profile"
                    className="dropdown-item"
                  >

                    <User size={16} />

                    Profile

                  </Link>


                  <button
                    onClick={handleLogout}
                    className="dropdown-item logout"
                  >

                    <LogOut size={16} />

                    Logout

                  </button>

                </div>

              </div>

            </>

          ) : (

            <>
              {/* LOGIN */}
              <Link to="/login" className="btn-secondary">
                Login
              </Link>


              {/* REGISTER */}
              <Link to="/register" className="btn-primary">
                Get Started
              </Link>
            </>

          )}

        </div>

      </div>

    </nav>
  );
};

export default Navbar;