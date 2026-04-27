import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { problemsAPI } from '../services/api';
import { toast } from 'react-toastify';
import { Code2, Search, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Problems.css';

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    difficulty: '',
    search: '',
    sort: '-createdAt'
  });

  const { user } = useAuth();

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

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this problem?')) return;

    try {
      await problemsAPI.delete(id);
      toast.success('Deleted successfully');
      fetchProblems();
    } catch {
      toast.error('Delete failed');
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const getDifficultyClass = (difficulty) => {
    return `badge ${difficulty.toLowerCase()}`;
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="problems-container">
      
      <div className="header">
        <h1><Code2 size={32} /> Problems</h1>
      </div>

      {/* Filters */}
      <div className="filters">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search problems..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>

        <select onChange={(e) => handleFilterChange('difficulty', e.target.value)}>
          <option value="">All</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>

      {/* Problems Grid */}
      <div className="grid">
        {problems.map((p) => (
          <div className="card" key={p._id}>
            
            <Link to={`/problems/${p._id}`} className="card-link">
              <div className="card-header">
                <h3>{p.title}</h3>
                <span className={getDifficultyClass(p.difficulty)}>
                  {p.difficulty}
                </span>
              </div>

              <p className="desc">
                {p.description.substring(0, 100)}...
              </p>
            </Link>

            <div className="card-footer">
              <span className="acceptance">
                {p.acceptanceRate || 0}% Accepted
              </span>

              {user?.role === 'admin' && (
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(p._id)}
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Problems;