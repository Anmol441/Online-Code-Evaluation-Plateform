import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Set default headers
api.defaults.headers.common['Content-Type'] = 'application/json';

// Auth API
export const authAPI = {
  register: (data) => api.post('/api/auth/register', data),
  verifyEmail: (data) => api.post('/api/auth/verify-email', data),
  resendOTP: (data) => api.post('/api/auth/resend-otp', data),
  login: (data) => api.post('/api/auth/login', data),
  forgotPassword: (data) => api.post('/api/auth/forgot-password', data),
  resetPassword: (data) => api.post('/api/auth/reset-password', data),
  getMe: () => api.get('/api/auth/me'),
  logout: () => api.post('/api/auth/logout')
};

// Problems API
export const problemsAPI = {
  getAll: (params) => api.get('/api/problems', { params }),
  getById: (id) => api.get(`/api/problems/${id}`),
  create: (data) => api.post('/api/problems', data),
  update: (id, data) => api.put(`/api/problems/${id}`, data),
  delete: (id) => api.delete(`/api/problems/${id}`),
  getStats: () => api.get('/api/problems/stats')
};

// Submissions API
export const submissionsAPI = {
  submit: (data) => api.post('/api/submissions', data),
  getMy: (params) => api.get('/api/submissions/my', { params }),
  getById: (id) => api.get(`/api/submissions/${id}`),
  getAll: (params) => api.get('/api/submissions/all', { params })
};

// Users API
export const usersAPI = {
  getProfile: () => api.get('/api/users/profile'),
  updateProfile: (data) => api.put('/api/users/profile', data),
  getDashboard: () => api.get('/api/users/dashboard'),
  getLeaderboard: (params) => api.get('/api/users/leaderboard', { params }),
  getById: (id) => api.get(`/api/users/${id}`),
  getTips: () => api.get('/api/users/tips')
};

// Admin API
export const adminAPI = {
  getAnalytics: () => api.get('/api/admin/analytics'),
  getAllUsers: (params) => api.get('/api/admin/users', { params }),
  toggleBlockUser: (id) => api.put(`/api/admin/users/${id}/block`),
  deleteUser: (id) => api.delete(`/api/admin/users/${id}`),
  updateUserRole: (id, data) => api.put(`/api/admin/users/${id}/role`, data),
  getProblemWithTestCases: (id) => api.get(`/api/admin/problems/${id}`)
};

// Export api instance for setting auth headers
export default api;
