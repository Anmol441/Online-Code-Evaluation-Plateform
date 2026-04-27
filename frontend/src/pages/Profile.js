import React, { useState, useEffect } from 'react';
import { usersAPI } from '../services/api';
import { toast } from 'react-toastify';
import { User, Mail, Edit2, Save, X, Trophy, Upload } from 'lucide-react';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', bio: '' });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await usersAPI.getProfile();
      const data = res.data.data;

      setProfile(data);
      setFormData({
        name: data.name || '',
        bio: data.bio || ''
      });
    } catch {
      toast.error('Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const form = new FormData();
      form.append('name', formData.name);
      form.append('bio', formData.bio);
      if (image) form.append('profilePic', image);

      const res = await usersAPI.updateProfile(form);
      setProfile(res.data.data);
      setEditing(false);
      toast.success('Profile updated');
    } catch {
      toast.error('Update failed');
    }
  };

  if (loading) {
    return <div className="loader">Loading profile...</div>;
  }

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: 'Inter', sans-serif;
        }

        .profile-page {
          min-height: 100vh;
          background: radial-gradient(circle at top, #1e293b, #0f172a);
          padding: 30px 20px;
          color: #fff;
        }

        .container {
          max-width: 1100px;
          margin: auto;
        }

        /* HEADER */
        .profile-header {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 25px;
          border-radius: 16px;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(15px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        }

        .profile-avatar {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #22c55e);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .profile-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .upload-btn {
          display: block;
          margin-top: 8px;
          font-size: 12px;
          cursor: pointer;
        }

        .profile-info h2 {
          margin: 0;
          font-size: 1.6rem;
        }

        .profile-info p {
          color: #cbd5f5;
          font-size: 0.9rem;
        }

        .role {
          display: inline-block;
          background: #6366f1;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.75rem;
          margin-top: 5px;
        }

        .ranking {
          margin-top: 6px;
          color: #facc15;
          font-weight: 600;
        }

        .btn {
          border: none;
          padding: 8px 14px;
          border-radius: 8px;
          cursor: pointer;
          margin-left: 5px;
        }

        .btn-primary { background: #6366f1; color: #fff; }
        .btn-success { background: #22c55e; color: #fff; }

        /* CARD */
        .card {
          margin-top: 20px;
          padding: 20px;
          border-radius: 16px;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(10px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.25);
          transition: 0.3s;
        }

        .card:hover {
          transform: translateY(-3px);
        }

        /* STATS */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
          margin-top: 20px;
        }

        .stat-box {
          padding: 20px;
          border-radius: 12px;
          text-align: center;
          background: rgba(255,255,255,0.05);
          transition: 0.3s;
        }

        .stat-box:hover {
          transform: scale(1.05);
        }

        .stat-box.highlight {
          background: linear-gradient(135deg, #6366f1, #22c55e);
        }

        .stat-box h4 {
          font-size: 0.9rem;
          color: #cbd5f5;
        }

        .stat-box p {
          font-size: 1.5rem;
          font-weight: bold;
        }

        /* SKILLS */
        .skill-bar {
          margin-top: 15px;
        }

        .bar {
          height: 8px;
          background: #1e293b;
          border-radius: 10px;
          overflow: hidden;
        }

        .fill {
          height: 100%;
        }

        .fill.easy { background: #22c55e; }
        .fill.medium { background: #f59e0b; }
        .fill.hard { background: #ef4444; }

        /* BADGES */
        .badges {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .badge {
          background: #1e293b;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
        }

        textarea, input {
          width: 100%;
          padding: 8px;
          border-radius: 8px;
          border: none;
          margin-top: 8px;
        }

        /* MOBILE */
        @media(max-width:768px){
          .profile-header {
            flex-direction: column;
            text-align: center;
          }

          .stats-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>

      <div className="profile-page">
        <div className="container">

          {/* HEADER */}
          <div className="profile-header">

            <div>
              <div className="profile-avatar">
                {profile.profilePic ? (
                  <img src={profile.profilePic} alt="avatar" />
                ) : (
                  <User size={45} />
                )}
              </div>

              {editing && (
                <label className="upload-btn">
                  <Upload size={14} />
                  <input
                    type="file"
                    hidden
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </label>
              )}
            </div>

            <div className="profile-info">
              {editing ? (
                <input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              ) : (
                <h2>{profile.name}</h2>
              )}

              <p><Mail size={14}/> {profile.email}</p>

              <span className="role">{profile.role}</span>
              <p className="ranking">🏆 Rank #{profile.rank || 0}</p>
            </div>

            <div>
              {editing ? (
                <>
                  <button onClick={handleUpdate} className="btn btn-success">
                    <Save size={14}/> Save
                  </button>
                  <button onClick={() => setEditing(false)} className="btn">
                    <X size={14}/> Cancel
                  </button>
                </>
              ) : (
                <button onClick={() => setEditing(true)} className="btn btn-primary">
                  <Edit2 size={14}/> Edit
                </button>
              )}
            </div>
          </div>

          {/* BIO */}
          <div className="card">
            <h3>About</h3>
            {editing ? (
              <textarea
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
              />
            ) : (
              <p>{profile.bio || 'No bio yet'}</p>
            )}
          </div>

          {/* STATS */}
          <div className="stats-grid">
            <div className="stat-box">
              <h4>Easy</h4>
              <p>{profile.statistics?.easy || 0}</p>
            </div>
            <div className="stat-box">
              <h4>Medium</h4>
              <p>{profile.statistics?.medium || 0}</p>
            </div>
            <div className="stat-box">
              <h4>Hard</h4>
              <p>{profile.statistics?.hard || 0}</p>
            </div>
            <div className="stat-box highlight">
              <h4>Total Score</h4>
              <p>{profile.totalScore || 0}</p>
            </div>
          </div>

          {/* SKILLS */}
          <div className="card">
            <h3>Skill Progress</h3>

            {['easy','medium','hard'].map(level => (
              <div key={level} className="skill-bar">
                <span>{level.toUpperCase()}</span>
                <div className="bar">
                  <div
                    className={`fill ${level}`}
                    style={{
                      width: `${(profile.statistics?.[level] || 0) * 5}%`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* BADGES */}
          <div className="card">
            <h3>Achievements</h3>
            <div className="badges">
              {profile.badges?.length ? (
                profile.badges.map((b, i) => (
                  <span key={i} className="badge">
                    <Trophy size={14}/> {b}
                  </span>
                ))
              ) : (
                <p>No badges yet</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Profile;