import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { usersAPI } from '../services/api';
import { toast } from 'react-toastify';
import { User, Mail, Edit2, Save, X } from 'lucide-react';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', bio: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await usersAPI.getProfile();
      setProfile(response.data.data);
      setFormData({ name: response.data.data.name, bio: response.data.data.bio || '' });
    } catch (error) {
      toast.error('Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await usersAPI.updateProfile(formData);
      setProfile(response.data.data);
      setEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  if (loading) return <div className="container"><div className="loading">Loading profile...</div></div>;

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-avatar">
              <User size={48} />
            </div>
            <div className="profile-info">
              {editing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="name-input"
                />
              ) : (
                <h1>{profile.name}</h1>
              )}
              <p><Mail size={16} /> {profile.email}</p>
              <span className={`role-badge ${profile.role}`}>{profile.role}</span>
            </div>
            <div className="edit-actions">
              {editing ? (
                <>
                  <button onClick={handleUpdate} className="btn btn-success btn-sm">
                    <Save size={16} /> Save
                  </button>
                  <button onClick={() => setEditing(false)} className="btn btn-secondary btn-sm">
                    <X size={16} /> Cancel
                  </button>
                </>
              ) : (
                <button onClick={() => setEditing(true)} className="btn btn-primary btn-sm">
                  <Edit2 size={16} /> Edit Profile
                </button>
              )}
            </div>
          </div>

          <div className="profile-content">
            <div className="bio-section">
              <h3>Bio</h3>
              {editing ? (
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell us about yourself..."
                  rows={4}
                />
              ) : (
                <p>{profile.bio || 'No bio yet'}</p>
              )}
            </div>

            <div className="stats-section">
              <h3>Statistics</h3>
              <div className="stats-grid-profile">
                <div className="stat-item"><strong>Easy:</strong> {profile.statistics.easy}</div>
                <div className="stat-item"><strong>Medium:</strong> {profile.statistics.medium}</div>
                <div className="stat-item"><strong>Hard:</strong> {profile.statistics.hard}</div>
                <div className="stat-item"><strong>Total Score:</strong> {profile.totalScore}</div>
                <div className="stat-item"><strong>Current Streak:</strong> {profile.streakData.currentStreak} days</div>
                <div className="stat-item"><strong>Longest Streak:</strong> {profile.streakData.longestStreak} days</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
