import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { toast } from 'react-toastify';
import { KeyRound, Mail } from 'lucide-react';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.forgotPassword({ email });

      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/reset-password', { state: { email } });
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to send OTP';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">
            <KeyRound size={32} />
          </div>
          <h1>Forgot Password?</h1>
          <p>No worries! Enter your email and we'll send you an OTP to reset your password.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-with-icon">
              <Mail className="input-icon" size={20} />
              <input
                type="email"
                name="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Sending OTP...' : 'Send Reset OTP'}
          </button>
        </form>

        <div className="auth-divider">
          <span>Remember your password?</span>
        </div>

        <Link to="/login" className="secondary-button">
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
