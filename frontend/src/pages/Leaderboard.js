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

      // ✅ Remove admin users
      const filteredUsers = response.data.data.filter(
        (user) => user.name !== 'admin'
      );

      setUsers(filteredUsers);
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
    return `#${rank}`;
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Loading leaderboard...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>
          <Trophy size={36} /> Leaderboard
        </h1>
        <p style={styles.subtitle}>Top performers on the platform</p>
      </div>

      {/* Filter */}
      <div style={styles.filterContainer}>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          style={styles.select}
        >
          <option value="">Overall Ranking</option>
          <option value="Easy">Easy Problems</option>
          <option value="Medium">Medium Problems</option>
          <option value="Hard">Hard Problems</option>
        </select>
      </div>

      {/* Table */}
      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeadRow}>
              <th style={styles.th}>Rank</th>
              <th style={styles.th}>Name</th>
              <th style={styles.thCenter}>Solved</th>
              <th style={styles.thCenter}>Score</th>
              <th style={styles.thCenter}>Acceptance</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => {
              const solved =
                user.statistics.easy +
                user.statistics.medium +
                user.statistics.hard;

              const acceptance =
                user.statistics.totalSubmissions > 0
                  ? (
                      (user.statistics.acceptedSubmissions /
                        user.statistics.totalSubmissions) *
                      100
                    ).toFixed(1)
                  : 0;

              return (
                <tr key={user._id} style={styles.tr}>
                  <td style={styles.rank}>
                    {getMedalIcon(index + 1)}
                  </td>

                  <td style={styles.name}>{user.name}</td>

                  <td style={styles.center}>{solved}</td>

                  <td style={styles.score}>{user.totalScore}</td>

                  <td style={styles.center}>{acceptance}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;

//
// 🎨 Internal CSS (Professional UI)
//
const styles = {
  container: {
    padding: '40px',
    background: '#f8fafc',
    minHeight: '100vh',
    fontFamily: 'Inter, sans-serif'
  },

  header: {
    marginBottom: '30px'
  },

  title: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '32px',
    fontWeight: '700',
    color: '#1e293b'
  },

  subtitle: {
    color: '#64748b',
    marginTop: '6px'
  },

  filterContainer: {
    marginBottom: '20px'
  },

  select: {
    padding: '10px 14px',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    fontSize: '14px',
    background: '#fff',
    cursor: 'pointer',
    outline: 'none'
  },

  card: {
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
    overflow: 'hidden'
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },

  tableHeadRow: {
    background: '#f1f5f9'
  },

  th: {
    padding: '16px',
    textAlign: 'left',
    fontSize: '14px',
    color: '#475569'
  },

  thCenter: {
    padding: '16px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#475569'
  },

  tr: {
    borderBottom: '1px solid #f1f5f9',
    transition: '0.2s'
  },

  rank: {
    padding: '16px',
    fontWeight: '600'
  },

  name: {
    padding: '16px',
    fontWeight: '600',
    color: '#1e293b'
  },

  center: {
    padding: '16px',
    textAlign: 'center'
  },

  score: {
    padding: '16px',
    textAlign: 'center',
    fontWeight: '700',
    color: '#6366f1'
  },

  loading: {
    textAlign: 'center',
    fontSize: '18px',
    paddingTop: '100px'
  }
};