import React from 'react';

export default function ProfileDetailModal({
  profile,
  onClose,
  onEdit,
  onDelete,
  onCopyEmail
}) {
  if (!profile) return null;

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-profile-name">
      <div className="modal-content animate-scale-in" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Modal Cover */}
        <div
          className="modal-cover"
          style={{ background: profile.avatarGradient || 'var(--primary-gradient)' }}
        />

        {/* Header with Avatar and Names */}
        <div className="modal-profile-header">
          <div className="modal-avatar-wrapper">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="modal-avatar-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80';
              }}
            />
          </div>
          <div className="modal-title-area">
            <h2 id="modal-profile-name" className="modal-name">
              {profile.name}
            </h2>
            <p className="modal-role">{profile.role}</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Department & Status Badges */}
          <div className="card-tags-row" style={{ marginBottom: '16px' }}>
            <span className="dept-tag">{profile.department}</span>
            <span className={`status-pill ${profile.status}`}>
              • {profile.status.charAt(0).toUpperCase() + profile.status.slice(1)}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: 'auto' }}>
              Joined {profile.joinedDate || 'Recently'}
            </span>
          </div>

          {/* Details Grid (Contact & Work Info) */}
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">Email Address</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="detail-val" style={{ fontSize: '13px' }}>{profile.email}</span>
                <button
                  className="copy-email-btn"
                  onClick={() => onCopyEmail(profile.email)}
                  title="Copy email"
                  aria-label="Copy email"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-label">Location</span>
              <span className="detail-val">📍 {profile.location}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Phone</span>
              <span className="detail-val">{profile.phone || '—'}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Timezone</span>
              <span className="detail-val">🕒 {profile.timezone || 'UTC'}</span>
            </div>
          </div>

          {/* Stats Boxes */}
          {profile.stats && (
            <div className="detail-stats-cards">
              <div className="detail-stat-box">
                <div className="detail-stat-val">{profile.stats.projects}</div>
                <div className="detail-stat-lbl">Active Projects</div>
              </div>
              <div className="detail-stat-box">
                <div className="detail-stat-val">{profile.stats.contributions}</div>
                <div className="detail-stat-lbl">Code Reviews</div>
              </div>
              <div className="detail-stat-box">
                <div className="detail-stat-val">⭐ {profile.stats.rating}</div>
                <div className="detail-stat-lbl">Peer Rating</div>
              </div>
            </div>
          )}

          {/* About / Bio */}
          <div className="detail-section-title">About</div>
          <p className="modal-bio-text">{profile.bio}</p>

          {/* Skills */}
          <div className="detail-section-title">Skills & Competencies</div>
          <div className="skills-container" style={{ marginBottom: '24px' }}>
            {profile.skills?.map((skill, index) => (
              <span key={index} className="skill-chip" style={{ fontSize: '12px', padding: '4px 10px' }}>
                {skill}
              </span>
            ))}
          </div>

          {/* Action Row */}
          <div className="modal-actions-row">
            <a
              href={`mailto:${profile.email}`}
              className="btn-secondary"
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              ✉️ Send Email
            </a>
            <button
              className="btn-secondary"
              onClick={() => {
                onClose();
                onEdit(profile);
              }}
            >
              ✏️ Edit Profile
            </button>
            <button
              className="btn-danger"
              onClick={() => {
                onClose();
                onDelete(profile.id);
              }}
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
