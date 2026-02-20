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
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
    fetchTips();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await usersAPI.getDashboard();
      setStats(response?.data?.data || null);
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const fetchTips = async () => {
    try {
      const response = await usersAPI.getTips();
      setTips(response?.data?.data || []);
    } catch (error) {
      console.error('Failed to fetch tips');
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="container">
        <div className="loading">No dashboard data available</div>
      </div>
    );
  }

  // SAFE language data
  const languageData = stats?.languageStats
    ? Object.entries(stats.languageStats)
        .filter(([_, count]) => count > 0)
        .map(([lang, count]) => ({
          name: lang.toUpperCase(),
          value: count
        }))
    : [];

  // SAFE difficulty data
  const difficultyData = [
    { name: 'Easy', value: stats?.statistics?.easy || 0, color: '#48bb78' },
    { name: 'Medium', value: stats?.statistics?.medium || 0, color: '#ed8936' },
    { name: 'Hard', value: stats?.statistics?.hard || 0, color: '#f56565' }
  ];

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">My Dashboard</h1>
          <p className="page-subtitle">
            Track your progress and achievements
          </p>
        </div>

        {/* Stats Overview */}
        <div className="stats-grid">
          <div className="stat-card primary">
            <div className="stat-icon">
              <Trophy />
            </div>
            <div>
              <div className="stat-value">
                {stats?.totalScore || 0}
              </div>
              <div className="stat-label">Total Score</div>
            </div>
          </div>

          <div className="stat-card success">
            <div className="stat-icon">
              <Code2 />
            </div>
            <div>
              <div className="stat-value">
                {(stats?.statistics?.easy || 0) +
                  (stats?.statistics?.medium || 0) +
                  (stats?.statistics?.hard || 0)}
              </div>
              <div className="stat-label">Problems Solved</div>
            </div>
          </div>

          <div className="stat-card info">
            <div className="stat-icon">
              <TrendingUp />
            </div>
            <div>
              <div className="stat-value">
                {stats?.successRate || 0}%
              </div>
              <div className="stat-label">Success Rate</div>
            </div>
          </div>

          <div className="stat-card warning">
            <div className="stat-icon">
              <Flame />
            </div>
            <div>
              <div className="stat-value">
                {stats?.streakData?.currentStreak || 0}
              </div>
              <div className="stat-label">Day Streak 🔥</div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="charts-row">
          <div className="chart-card">
            <h3>Problems by Difficulty</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={difficultyData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {difficultyData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {languageData.length > 0 && (
            <div className="chart-card">
              <h3>Language Usage</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={languageData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#667eea" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Recent Submissions */}
        <div className="submissions-section">
          <div className="section-header">
            <h2>Recent Submissions</h2>
            <Link to="/submissions" className="view-all">
              View All →
            </Link>
          </div>

          <div className="submissions-list">
            {stats?.recentSubmissions?.length > 0 ? (
              stats.recentSubmissions
                .filter(
                  (submission) =>
                    submission &&
                    submission._id &&
                    submission.problemId &&
                    submission.problemId._id
                )
                .slice(0, 5)
                .map((submission) => (
                  <div
                    key={submission._id}
                    className="submission-item"
                  >
                    <div className="submission-info">
                      <Link
                        to={`/problems/${submission.problemId._id}`}
                        className="problem-name"
                      >
                        {submission.problemId.title}
                      </Link>

                      <span
                        className={`badge badge-${submission.problemId.difficulty?.toLowerCase()}`}
                      >
                        {submission.problemId.difficulty}
                      </span>
                    </div>

                    <div className="submission-details">
                      <span
                        className={`verdict verdict-${submission.verdict
                          ?.replace(/ /g, '-')
                          .toLowerCase()}`}
                      >
                        {submission.verdict}
                      </span>

                      <span className="language">
                        {submission.language?.toUpperCase()}
                      </span>

                      <span className="time">
                        <Clock size={14} />
                        {submission.createdAt
                          ? new Date(
                              submission.createdAt
                            ).toLocaleDateString()
                          : ''}
                      </span>
                    </div>
                  </div>
                ))
            ) : (
              <p>No recent submissions</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
