import React, { useState, useEffect, useCallback } from 'react';
import { usersAPI } from '../services/api';
import { toast } from 'react-toastify';
import { Trophy } from 'lucide-react';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [difficulty, setDifficulty] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchLeaderboard = useCallback(async () => {
    try {
      const response = await usersAPI.getLeaderboard({ difficulty, limit: 50 });
      setUsers(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch leaderboard');
    } finally {
      setLoading(false);
    }
  }, [difficulty]);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  const getMedalIcon = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank;
  };

  if (loading) return <div className="container"><div className="loading">Loading leaderboard...</div></div>;

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div className="page-header">
        <h1 className="page-title"><Trophy size={40} /> Leaderboard</h1>
        <p className="page-subtitle">Top performers on the platform</p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          style={{ padding: '0.75rem', borderRadius: '8px', border: '2px solid #e2e8f0', fontSize: '1rem' }}
        >
          <option value="">Overall Ranking</option>
          <option value="Easy">Easy Problems</option>
          <option value="Medium">Medium Problems</option>
          <option value="Hard">Hard Problems</option>
        </select>
      </div>

      <div className="card">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Rank</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '1rem', textAlign: 'center' }}>Solved</th>
              <th style={{ padding: '1rem', textAlign: 'center' }}>Score</th>
              <th style={{ padding: '1rem', textAlign: 'center' }}>Acceptance</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '1rem', fontWeight: '600', fontSize: '1.1rem' }}>
                  {getMedalIcon(user.rank)}
                </td>
                <td style={{ padding: '1rem', fontWeight: '600' }}>{user.name}</td>
                <td style={{ padding: '1rem', textAlign: 'center' }}>
                  {user.statistics.easy + user.statistics.medium + user.statistics.hard}
                </td>
                <td style={{ padding: '1rem', textAlign: 'center', fontWeight: '600', color: '#667eea' }}>
                  {user.totalScore}
                </td>
                <td style={{ padding: '1rem', textAlign: 'center' }}>
                  {user.statistics.totalSubmissions > 0
                    ? ((user.statistics.acceptedSubmissions / user.statistics.totalSubmissions) * 100).toFixed(1)
                    : 0}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
