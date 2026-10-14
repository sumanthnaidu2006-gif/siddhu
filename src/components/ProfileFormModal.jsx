import React, { useState } from 'react';
import { DEPARTMENTS, AVATAR_PRESETS } from '../data/mockProfiles';

export default function ProfileFormModal({
  isOpen,
  onClose,
  onSave,
  initialData
}) {
  const isEditing = Boolean(initialData && initialData.id);

  const [formData, setFormData] = useState(() => {
    if (initialData) {
      return {
        name: initialData.name || '',
        email: initialData.email || '',
        role: initialData.role || '',
        department: initialData.department || 'Engineering',
        status: initialData.status || 'active',
        location: initialData.location || '',
        phone: initialData.phone || '',
        timezone: initialData.timezone || 'UTC-7 (PST)',
        bio: initialData.bio || '',
        avatar: initialData.avatar || AVATAR_PRESETS[0],
        skills: Array.isArray(initialData.skills)
          ? initialData.skills.join(', ')
          : initialData.skills || ''
      };
    }
    return {
      name: '',
      email: '',
      role: '',
      department: 'Engineering',
      status: 'active',
      location: '',
      phone: '',
      timezone: 'UTC-7 (PST)',
      bio: '',
      avatar: AVATAR_PRESETS[Math.floor(Math.random() * AVATAR_PRESETS.length)],
      skills: 'AWS Amplify, React, TypeScript'
    };
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.role.trim()) {
      alert('Please fill in Name, Email, and Role.');
      return;
    }

    const skillsArray = formData.skills
      ? formData.skills
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    const profileData = {
      ...initialData,
      name: formData.name.trim(),
      email: formData.email.trim(),
      role: formData.role.trim(),
      department: formData.department,
      status: formData.status,
      location: formData.location.trim() || 'Remote',
      phone: formData.phone.trim(),
      timezone: formData.timezone.trim(),
      bio: formData.bio.trim() || 'Team member at CloudPulse.',
      avatar: formData.avatar,
      skills: skillsArray.length > 0 ? skillsArray : ['Cloud Engineering'],
      isFavorite: initialData ? initialData.isFavorite : false,
      stats: initialData?.stats || { projects: 1, contributions: 12, rating: 5.0 }
    };

    onSave(profileData);
    onClose();
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="form-modal-title">
      <div className="modal-content animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        <h2 id="form-modal-title" className="form-title">
          {isEditing ? 'Edit Profile' : 'Add New Profile'}
        </h2>

        <form onSubmit={handleSubmit} className="profile-form">
          {/* Avatar Presets Selection */}
          <div className="form-group">
            <label>Select Profile Avatar</label>
            <div className="avatar-presets-grid">
              {AVATAR_PRESETS.map((preset, index) => (
                <button
                  type="button"
                  key={index}
                  className={`avatar-preset-btn ${formData.avatar === preset ? 'selected' : ''}`}
                  onClick={() => setFormData((p) => ({ ...p, avatar: preset }))}
                  title="Choose this avatar"
                >
                  <img src={preset} alt={`Avatar preset ${index + 1}`} />
                </button>
              ))}
            </div>
            <input
              type="url"
              name="avatar"
              className="form-input"
              placeholder="Or enter custom avatar image URL..."
              value={formData.avatar}
              onChange={handleChange}
              style={{ marginTop: '6px', fontSize: '12px' }}
            />
          </div>

          {/* Name & Email Row */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name-input">Full Name *</label>
              <input
                id="name-input"
                type="text"
                name="name"
                required
                className="form-input"
                placeholder="e.g. Alex Rivera"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email-input">Work Email *</label>
              <input
                id="email-input"
                type="email"
                name="email"
                required
                className="form-input"
                placeholder="alex.rivera@cloudpulse.io"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Role & Department Row */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="role-input">Job Title / Role *</label>
              <input
                id="role-input"
                type="text"
                name="role"
                required
                className="form-input"
                placeholder="e.g. Senior Cloud Architect"
                value={formData.role}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="dept-select">Department</label>
              <select
                id="dept-select"
                name="department"
                className="form-select"
                value={formData.department}
                onChange={handleChange}
              >
                {DEPARTMENTS.filter((d) => d !== 'All').map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Status & Location Row */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="status-select">Current Status</label>
              <select
                id="status-select"
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">🟢 Active</option>
                <option value="away">🟡 Away</option>
                <option value="offline">⚪ Offline</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="location-input">Location</label>
              <input
                id="location-input"
                type="text"
                name="location"
                className="form-input"
                placeholder="e.g. San Francisco, CA or Remote"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Phone & Timezone Row */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone-input">Phone Number</label>
              <input
                id="phone-input"
                type="text"
                name="phone"
                className="form-input"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="timezone-input">Timezone</label>
              <input
                id="timezone-input"
                type="text"
                name="timezone"
                className="form-input"
                placeholder="UTC-7 (PST)"
                value={formData.timezone}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Skills (comma separated) */}
          <div className="form-group">
            <label htmlFor="skills-input">Skills & Technologies (comma separated)</label>
            <input
              id="skills-input"
              type="text"
              name="skills"
              className="form-input"
              placeholder="e.g. AWS Amplify, React, GraphQL, DynamoDB"
              value={formData.skills}
              onChange={handleChange}
            />
          </div>

          {/* Bio */}
          <div className="form-group">
            <label htmlFor="bio-input">Bio / About Me</label>
            <textarea
              id="bio-input"
              name="bio"
              className="form-textarea"
              placeholder="Write a brief intro, experience, or specializations..."
              value={formData.bio}
              onChange={handleChange}
            />
          </div>

          {/* Form Actions */}
          <div className="modal-actions-row">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" id="save-profile-btn">
              {isEditing ? 'Save Changes' : 'Create Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
