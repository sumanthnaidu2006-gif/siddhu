import React from 'react';

export default function ProfileListItem({
  profile,
  onView,
  onEdit,
  onDelete,
  onToggleFavorite,
  onCopyEmail
}) {
  return (
    <tr className="animate-fade-in">
      {/* User Info */}
      <td>
        <div className="table-user-cell">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="table-avatar"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80';
            }}
          />
          <div className="table-user-info">
            <span
              className="table-user-name"
              onClick={() => onView(profile)}
            >
              {profile.name}
            </span>
            <span className="table-user-email">
              {profile.email}
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
            </span>
          </div>
        </div>
      </td>

      {/* Role & Department */}
      <td>
        <div>
          <div style={{ fontWeight: 600 }}>{profile.role}</div>
          <span className="dept-tag" style={{ marginTop: '4px', display: 'inline-block' }}>
            {profile.department}
          </span>
        </div>
      </td>

      {/* Status */}
      <td>
        <span className={`status-pill ${profile.status}`}>
          • {profile.status.charAt(0).toUpperCase() + profile.status.slice(1)}
        </span>
      </td>

      {/* Location */}
      <td>
        <span style={{ color: 'var(--text-secondary)' }}>{profile.location}</span>
      </td>

      {/* Skills */}
      <td>
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {profile.skills?.slice(0, 2).map((skill, i) => (
            <span key={i} className="skill-chip">
              {skill}
            </span>
          ))}
          {profile.skills?.length > 2 && (
            <span className="skill-chip">+{profile.skills.length - 2}</span>
          )}
        </div>
      </td>

      {/* Action Buttons */}
      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            className={`btn-card-icon ${profile.isFavorite ? 'favorited' : ''}`}
            onClick={() => onToggleFavorite(profile.id)}
            style={{ color: profile.isFavorite ? '#fbbf24' : 'inherit' }}
            title="Favorite"
            aria-label="Favorite profile"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill={profile.isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </button>
          <button
            className="btn-card-icon"
            onClick={() => onView(profile)}
            title="View details"
            aria-label="View details"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </button>
          <button
            className="btn-card-icon"
            onClick={() => onEdit(profile)}
            title="Edit"
            aria-label="Edit profile"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
          <button
            className="btn-card-icon delete"
            onClick={() => onDelete(profile.id)}
            title="Delete"
            aria-label="Delete profile"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}
