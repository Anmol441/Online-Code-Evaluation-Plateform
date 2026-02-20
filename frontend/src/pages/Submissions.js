import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { submissionsAPI } from '../services/api';
import { toast } from 'react-toastify';
import { FileCode, Clock } from 'lucide-react';

const Submissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await submissionsAPI.getMy({ limit: 50 });
      setSubmissions(response?.data?.data || []);
    } catch (error) {
      toast.error('Failed to fetch submissions');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading submissions...</div>
      </div>
    );
  }

  // ✅ Filter invalid submissions
  const validSubmissions = submissions.filter(
    (sub) =>
      sub &&
      sub._id &&
      sub.problemId &&
      sub.problemId._id
  );

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div className="page-header">
        <h1 className="page-title">
          <FileCode size={40} /> My Submissions
        </h1>
        <p className="page-subtitle">View your submission history</p>
      </div>

      <div className="card">
        {validSubmissions.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '3rem',
              color: '#718096'
            }}
          >
            <FileCode
              size={48}
              style={{ marginBottom: '1rem', opacity: 0.5 }}
            />
            <p>No submissions yet. Start solving problems!</p>
            <Link
              to="/problems"
              className="btn btn-primary"
              style={{ marginTop: '1rem' }}
            >
              Browse Problems
            </Link>
          </div>
        ) : (
          <table
            style={{ width: '100%', borderCollapse: 'collapse' }}
          >
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ padding: '1rem', textAlign: 'left' }}>
                  Problem
                </th>
                <th style={{ padding: '1rem', textAlign: 'center' }}>
                  Difficulty
                </th>
                <th style={{ padding: '1rem', textAlign: 'center' }}>
                  Language
                </th>
                <th style={{ padding: '1rem', textAlign: 'center' }}>
                  Verdict
                </th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>
                  Submitted
                </th>
              </tr>
            </thead>

            <tbody>
              {validSubmissions.map((sub) => (
                <tr
                  key={sub._id}
                  style={{
                    borderBottom: '1px solid #e2e8f0'
                  }}
                >
                  <td style={{ padding: '1rem' }}>
                    <Link
                      to={`/problems/${sub.problemId._id}`}
                      style={{
                        fontWeight: '600',
                        textDecoration: 'none',
                        color: '#1a202c'
                      }}
                    >
                      {sub.problemId.title}
                    </Link>
                  </td>

                  <td
                    style={{
                      padding: '1rem',
                      textAlign: 'center'
                    }}
                  >
                    <span
                      className={`badge badge-${sub.problemId.difficulty?.toLowerCase()}`}
                    >
                      {sub.problemId.difficulty}
                    </span>
                  </td>

                  <td
                    style={{
                      padding: '1rem',
                      textAlign: 'center',
                      textTransform: 'uppercase',
                      fontWeight: '600'
                    }}
                  >
                    {sub.language}
                  </td>

                  <td
                    style={{
                      padding: '1rem',
                      textAlign: 'center'
                    }}
                  >
                    <span
                      className={`badge badge-${
                        sub.verdict === 'Accepted'
                          ? 'accepted'
                          : 'wrong'
                      }`}
                    >
                      {sub.verdict}
                    </span>
                  </td>

                  <td
                    style={{
                      padding: '1rem',
                      textAlign: 'right',
                      fontSize: '0.9rem',
                      color: '#718096'
                    }}
                  >
                    <Clock
                      size={14}
                      style={{ marginRight: '0.25rem' }}
                    />
                    {sub.createdAt
                      ? new Date(
                          sub.createdAt
                        ).toLocaleDateString()
                      : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Submissions;
