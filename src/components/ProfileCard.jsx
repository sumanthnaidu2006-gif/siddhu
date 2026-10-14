import React from 'react';

export default function ProfileCard({
  profile,
  onView,
  onEdit,
  onDelete,
  onToggleFavorite,
  onCopyEmail
}) {
  return (
    <article className="profile-card animate-slide-up" aria-label={`Profile card for ${profile.name}`}>
      {/* Top Banner with Favorite Button */}
      <div className="card-banner" style={{ background: profile.avatarGradient || 'var(--accent-gradient)' }}>
        <button
          className={`card-favorite-btn ${profile.isFavorite ? 'favorited' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(profile.id);
          }}
          title={profile.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          aria-label={profile.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={profile.isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </button>
      </div>

      <div className="card-body">
        {/* Avatar with Status Pulse */}
        <div className="card-avatar-wrapper" onClick={() => onView(profile)} style={{ cursor: 'pointer' }}>
          <img
            src={profile.avatar}
            alt={profile.name}
            className="card-avatar-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80';
            }}
          />
          <span
            className={`status-badge status-${profile.status}`}
            title={`Status: ${profile.status}`}
          />
        </div>

        {/* Title & Role */}
        <div className="card-title-group">
          <h3 className="card-name" onClick={() => onView(profile)}>
            {profile.name}
          </h3>
          <p className="card-role">{profile.role}</p>
        </div>

        {/* Department & Status Pills */}
        <div className="card-tags-row">
          <span className="dept-tag">{profile.department}</span>
          <span className={`status-pill ${profile.status}`}>
            • {profile.status.charAt(0).toUpperCase() + profile.status.slice(1)}
          </span>
        </div>

        {/* Location & Email with Copy */}
        <div className="card-meta-list">
          <div className="card-meta-item" title={profile.location}>
            <span className="meta-icon">📍</span>
            <span>{profile.location}</span>
          </div>
          <div className="card-meta-item">
            <span className="meta-icon">✉️</span>
            <span title={profile.email}>{profile.email}</span>
            <button
              className="copy-email-btn"
              onClick={(e) => {
                e.stopPropagation();
                onCopyEmail(profile.email);
              }}
              title="Copy email to clipboard"
              aria-label="Copy email"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Bio Excerpt */}
        <p className="card-bio">{profile.bio}</p>

        {/* Skills Chips */}
        <div className="skills-container">
          {profile.skills?.slice(0, 3).map((skill, idx) => (
            <span key={idx} className="skill-chip">
              {skill}
            </span>
          ))}
          {profile.skills?.length > 3 && (
            <span className="skill-chip" title={profile.skills.slice(3).join(', ')}>
              +{profile.skills.length - 3}
            </span>
          )}
        </div>

        {/* Card Footer Actions */}
        <div className="card-actions-row">
          <button
            className="btn-card-view"
            onClick={() => onView(profile)}
          >
            View Details
          </button>
          <button
            className="btn-card-icon"
            onClick={() => onEdit(profile)}
            title="Edit profile"
            aria-label="Edit profile"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
          <button
            className="btn-card-icon delete"
            onClick={() => onDelete(profile.id)}
            title="Delete profile"
            aria-label="Delete profile"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
