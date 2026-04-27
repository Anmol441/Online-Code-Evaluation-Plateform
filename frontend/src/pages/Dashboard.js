import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usersAPI } from '../services/api';
import { toast } from 'react-toastify';
import { Trophy, Code2, TrendingUp, Flame, Clock } from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await usersAPI.getDashboard();
      setStats(response?.data?.data || {});
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  // Safe fallback
  const safeStats = stats || {};

  const totalSolved =
    (safeStats?.statistics?.easy || 0) +
    (safeStats?.statistics?.medium || 0) +
    (safeStats?.statistics?.hard || 0);

  const difficultyData = [
    { name: 'Easy', value: safeStats?.statistics?.easy || 0, color: '#48bb78' },
    { name: 'Medium', value: safeStats?.statistics?.medium || 0, color: '#ed8936' },
    { name: 'Hard', value: safeStats?.statistics?.hard || 0, color: '#f56565' }
  ];

  const languageData = safeStats?.languageStats
    ? Object.entries(safeStats.languageStats)
        .filter(([_, count]) => count > 0)
        .map(([lang, count]) => ({
          name: lang.toUpperCase(),
          value: count
        }))
    : [];

  return (
    <div className="dashboard-page">
      <div className="container">

        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Track your coding performance</p>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card primary">
            <Trophy />
            <div>
              <h2>{safeStats.totalScore || 0}</h2>
              <p>Total Score</p>
            </div>
          </div>

          <div className="stat-card success">
            <Code2 />
            <div>
              <h2>{totalSolved}</h2>
              <p>Problems Solved</p>
            </div>
          </div>

          <div className="stat-card info">
            <TrendingUp />
            <div>
              <h2>{safeStats.successRate || 0}%</h2>
              <p>Success Rate</p>
            </div>
          </div>

          <div className="stat-card warning">
            <Flame />
            <div>
              <h2>{safeStats?.streakData?.currentStreak || 0}</h2>
              <p>Streak 🔥</p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="charts-row">

          <div className="chart-card">
            <h3>Difficulty Breakdown</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={difficultyData} dataKey="value">
                  {difficultyData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {languageData.length > 0 && (
            <div className="chart-card">
              <h3>Languages Used</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={languageData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Recent Submissions */}
        <div className="submissions-section">
          <div className="section-header">
            <h2>Recent Submissions</h2>
            <Link to="/submissions">View All</Link>
          </div>

          <div className="submissions-list">
            {(safeStats?.recentSubmissions || [])
              .filter((s) => s && s.problemId) // ✅ IMPORTANT FIX
              .slice(0, 5)
              .map((submission) => (
                <div key={submission._id} className="submission-item">

                  <div className="submission-info">
                    <Link
                      to={`/problems/${submission.problemId?._id}`}
                      className="problem-name"
                    >
                      {submission.problemId?.title || 'Unknown Problem'}
                    </Link>

                    <span className="badge">
                      {submission.problemId?.difficulty || 'N/A'}
                    </span>
                  </div>

                  <div className="submission-details">
                    <span className={`verdict ${submission.verdict?.toLowerCase()}`}>
                      {submission.verdict}
                    </span>

                    <span className="language">
                      {submission.language?.toUpperCase()}
                    </span>

                    <span className="time">
                      <Clock size={14} />
                      {submission.createdAt
                        ? new Date(submission.createdAt).toLocaleDateString()
                        : ''}
                    </span>
                  </div>

                </div>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;