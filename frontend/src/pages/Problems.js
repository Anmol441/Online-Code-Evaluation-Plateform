import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { problemsAPI } from '../services/api';
import { toast } from 'react-toastify';
import { Code2, Search, TrendingUp, CheckCircle } from 'lucide-react';
import './Problems.css';

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    difficulty: '',
    search: '',
    tag: '',
    sort: '-createdAt'
  });
  const [stats, setStats] = useState(null);

  const fetchProblems = useCallback(async () => {
    try {
      const response = await problemsAPI.getAll(filters);
      setProblems(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch problems');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProblems();
  }, [fetchProblems]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await problemsAPI.getStats();
      setStats(response.data.data);
    } catch (error) {
      console.error('Failed to fetch stats');
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '#48bb78';
      case 'Medium': return '#ed8936';
      case 'Hard': return '#f56565';
      default: return '#718096';
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading problems...</div>
      </div>
    );
  }

  return (
    <div className="problems-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">
              <Code2 size={40} />
              Practice Problems
            </h1>
            <p className="page-subtitle">Solve coding challenges and improve your skills</p>
          </div>
        </div>

        {/* Stats Overview */}
        {stats && (
          <div className="stats-overview">
            <div className="stat-box">
              <div className="stat-icon">
                <Code2 size={24} />
              </div>
              <div>
                <div className="stat-value">{stats.total}</div>
                <div className="stat-label">Total Problems</div>
              </div>
            </div>
            {stats.byDifficulty.map((item) => (
              <div key={item._id} className="stat-box">
                <div className="stat-icon" style={{ background: getDifficultyColor(item._id) }}>
                  <TrendingUp size={24} />
                </div>
                <div>
                  <div className="stat-value">{item.count}</div>
                  <div className="stat-label">{item._id}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Filters */}
        <div className="filters-section">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search problems..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>

          <select
            value={filters.difficulty}
            onChange={(e) => handleFilterChange('difficulty', e.target.value)}
          >
            <option value="">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <select
            value={filters.sort}
            onChange={(e) => handleFilterChange('sort', e.target.value)}
          >
            <option value="-createdAt">Newest First</option>
            <option value="createdAt">Oldest First</option>
            <option value="title">Title (A-Z)</option>
            <option value="-title">Title (Z-A)</option>
            <option value="-acceptanceRate">Acceptance Rate</option>
          </select>
        </div>

        {/* Problems List */}
        <div className="problems-list">
          {problems.length === 0 ? (
            <div className="no-problems">
              <Code2 size={48} />
              <p>No problems found</p>
            </div>
          ) : (
            problems.map((problem) => (
              <Link 
                to={`/problems/${problem._id}`} 
                key={problem._id} 
                className="problem-card"
              >
                <div className="problem-header">
                  <h3 className="problem-title">{problem.title}</h3>
                  <span 
                    className="difficulty-badge"
                    style={{ background: getDifficultyColor(problem.difficulty) }}
                  >
                    {problem.difficulty}
                  </span>
                </div>

                <p className="problem-description">
                  {problem.description.substring(0, 150)}...
                </p>

                <div className="problem-footer">
                  <div className="problem-tags">
                    {problem.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>

                  <div className="problem-stats">
                    <span className="acceptance-rate">
                      <CheckCircle size={16} />
                      {problem.acceptanceRate || 0}% Acceptance
                    </span>
                    <span className="submissions">
                      {problem.totalSubmissions || 0} Submissions
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Problems;
