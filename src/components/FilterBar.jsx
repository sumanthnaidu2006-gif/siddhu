import React from 'react';
import { DEPARTMENTS } from '../data/mockProfiles';

export default function FilterBar({
  selectedDept,
  setSelectedDept,
  selectedStatus,
  setSelectedStatus,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  totalResults,
  onResetFilters,
  isFiltered
}) {
  return (
    <div className="toolbar-card">
      <div className="toolbar-top">
        {/* Department Pills */}
        <div className="dept-pills" role="tablist" aria-label="Filter by department">
          {DEPARTMENTS.map((dept) => (
            <button
              key={dept}
              role="tab"
              aria-selected={selectedDept === dept}
              className={`dept-pill ${selectedDept === dept ? 'active' : ''}`}
              onClick={() => setSelectedDept(dept)}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Filters & View Mode Controls */}
        <div className="toolbar-controls">
          {/* Status Filter */}
          <select
            id="status-filter-select"
            className="select-filter"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            aria-label="Filter by status"
          >
            <option value="all">All Statuses</option>
            <option value="active">🟢 Active</option>
            <option value="away">🟡 Away</option>
            <option value="offline">⚪ Offline</option>
          </select>

          {/* Sort By */}
          <select
            id="sort-by-select"
            className="select-filter"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort profiles"
          >
            <option value="name-asc">Name (A → Z)</option>
            <option value="name-desc">Name (Z → A)</option>
            <option value="rating">Top Rated</option>
            <option value="department">Department</option>
          </select>

          {/* Grid / List View Toggle */}
          <div className="view-toggle-group">
            <button
              id="grid-view-btn"
              className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Card Grid View"
              aria-label="Grid view"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </button>
            <button
              id="list-view-btn"
              className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List View"
              aria-label="List view"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Results Sub-bar */}
      <div className="results-info-bar">
        <span>Showing {totalResults} {totalResults === 1 ? 'profile' : 'profiles'}</span>
        {isFiltered && (
          <button className="clear-filters-btn" onClick={onResetFilters}>
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
}
