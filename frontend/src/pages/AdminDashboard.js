import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../services/api';
import { toast } from 'react-toastify';
import { Shield, Users, Code2, FileText, TrendingUp, Plus } from 'lucide-react';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await adminAPI.getAnalytics();
      setAnalytics(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container"><div className="loading">Loading admin dashboard...</div></div>;

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title"><Shield size={40} /> Admin Dashboard</h1>
          <p className="page-subtitle">Platform overview and management</p>
        </div>
        <Link to="/admin/add-problem" className="btn btn-success">
          <Plus size={20} />
          Add New Problem
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon"><Users /></div>
          <div>
            <div className="stat-value">{analytics.users.total}</div>
            <div className="stat-label">Total Users</div>
          </div>
        </div>
        <div className="stat-card success">
          <div className="stat-icon"><Code2 /></div>
          <div>
            <div className="stat-value">{analytics.problems.total}</div>
            <div className="stat-label">Total Problems</div>
          </div>
        </div>
        <div className="stat-card info">
          <div className="stat-icon"><FileText /></div>
          <div>
            <div className="stat-value">{analytics.submissions.total}</div>
            <div className="stat-label">Total Submissions</div>
          </div>
        </div>
        <div className="stat-card warning">
          <div className="stat-icon"><TrendingUp /></div>
          <div>
            <div className="stat-value">{analytics.users.active}</div>
            <div className="stat-label">Active Users</div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ marginBottom: '1.5rem' }}>Top Performers</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '1rem', textAlign: 'center' }}>Solved</th>
              <th style={{ padding: '1rem', textAlign: 'center' }}>Score</th>
            </tr>
          </thead>
          <tbody>
            {analytics.topPerformers.slice(0, 10).map((user) => (
              <tr key={user._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '1rem' }}>{user.name}</td>
                <td style={{ padding: '1rem', textAlign: 'center' }}>
                  {user.statistics.easy + user.statistics.medium + user.statistics.hard}
                </td>
                <td style={{ padding: '1rem', textAlign: 'center', fontWeight: '600' }}>
                  {user.totalScore}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
