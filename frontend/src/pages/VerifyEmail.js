import React, { useState, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import { toast } from 'react-toastify';
import { ShieldCheck } from 'lucide-react';
import './Auth.css';

const VerifyEmail = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const email = location.state?.email;

  if (!email) {
    navigate('/register');
    return null;
  }

  // 🔥 Internal Styles (No functionality change)
  const styles = {
    otpContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '12px',
      margin: '25px 0'
    },
    otpInput: {
      width: '50px',
      height: '55px',
      textAlign: 'center',
      fontSize: '22px',
      fontWeight: 'bold',
      borderRadius: '10px',
      border: '2px solid #ddd',
      outline: 'none',
      transition: 'all 0.2s ease',
      background: '#f9fafb'
    },
    button: {
      width: '100%',
      padding: '12px',
      borderRadius: '10px',
      border: 'none',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: '#fff',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '15px',
      transition: '0.3s'
    },
    resendBtn: {
      marginTop: '10px',
      background: 'none',
      border: 'none',
      color: '#667eea',
      cursor: 'pointer',
      fontWeight: '500'
    }
  };

  const handleChange = (index, value) => {
    if (value.length > 1) value = value[0];
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split('');
    while (newOtp.length < 6) newOtp.push('');
    setOtp(newOtp);

    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      toast.error('Please enter complete OTP');
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.verifyEmail({
        email,
        otp: otpCode
      });

      if (response.data.success) {
        login(response.data.data, response.data.token);
        toast.success(response.data.message);
        navigate('/dashboard');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Verification failed';
      toast.error(message);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResending(true);

    try {
      const response = await authAPI.resendOTP({ email });

      if (response.data.success) {
        toast.success(response.data.message);
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to resend OTP';
      toast.error(message);
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">
            <ShieldCheck size={32} />
          </div>
          <h1>Verify Your Email</h1>
          <p>We've sent a 6-digit OTP to</p>
          <p style={{ fontWeight: 600, color: '#667eea' }}>{email}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {/* 🔥 Styled OTP Inputs */}
          <div style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                style={styles.otpInput}
                onFocus={(e) => {
                  e.target.style.border = '2px solid #667eea';
                  e.target.style.boxShadow = '0 0 8px rgba(102,126,234,0.4)';
                }}
                onBlur={(e) => {
                  e.target.style.border = '2px solid #ddd';
                  e.target.style.boxShadow = 'none';
                }}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                autoFocus={index === 0}
              />
            ))}
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>

        <div className="resend-otp">
          <p>Didn't receive the code?</p>
          <button onClick={handleResendOTP} style={styles.resendBtn} disabled={resending}>
            {resending ? 'Sending...' : 'Resend OTP'}
          </button>
        </div>

        <div className="auth-divider">
          <span>Or</span>
        </div>

        <Link to="/login" className="secondary-button">
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default VerifyEmail;