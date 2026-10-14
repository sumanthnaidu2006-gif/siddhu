import React from 'react';

export default function Navbar({
  searchTerm,
  setSearchTerm,
  theme,
  toggleTheme,
  onOpenAddModal,
  onOpenAmplifyGuide,
  isCloudConnected
}) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Brand Section */}
        <div className="brand-section" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="brand-icon-wrapper">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div className="brand-text">
            <h1>
              ProfilesCloud
              <span
                className="brand-badge"
                style={
                  isCloudConnected
                    ? {
                        background: 'rgba(16, 185, 129, 0.15)',
                        color: 'var(--status-active)',
                        borderColor: 'rgba(16, 185, 129, 0.4)'
                      }
                    : {}
                }
              >
                {isCloudConnected ? '🟢 AWS Live Cloud' : 'Amplify Gen 2'}
              </span>
            </h1>
            <span className="brand-subtitle">Team & User Directory</span>
          </div>
        </div>

        {/* Global Quick Search */}
        <div className="nav-search-box">
          <svg className="nav-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            id="nav-search-input"
            type="text"
            className="nav-search-input"
            placeholder="Search profiles, skills, roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="nav-search-clear"
              onClick={() => setSearchTerm('')}
              title="Clear search"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Action Controls */}
        <div className="navbar-actions">
          {/* AWS Amplify Guide Button */}
          <button
            id="amplify-guide-btn"
            className="btn-amplify-badge"
            onClick={onOpenAmplifyGuide}
            title="View AWS Amplify Gen 2 Backend Setup Guide"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
            </svg>
            <span>Amplify Docs</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            id="theme-toggle-btn"
            className="btn-icon"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>

          {/* Add Profile CTA */}
          <button
            id="add-profile-header-btn"
            className="btn-primary"
            onClick={onOpenAddModal}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>Add Profile</span>
          </button>
        </div>
      </div>
    </header>
  );
}
