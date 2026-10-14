import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import StatsBar from './components/StatsBar';
import FilterBar from './components/FilterBar';
import ProfileCard from './components/ProfileCard';
import ProfileListItem from './components/ProfileListItem';
import ProfileDetailModal from './components/ProfileDetailModal';
import ProfileFormModal from './components/ProfileFormModal';
import AmplifyGuideModal from './components/AmplifyGuideModal';
import Toast from './components/Toast';
import { INITIAL_PROFILES } from './data/mockProfiles';
import { client, isConfigured } from './amplifyClient';
import './App.css';

export default function App() {
  // Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('profiles_theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('profiles_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Sync with Live AWS Cloud if configured
  useEffect(() => {
    if (isConfigured && client?.models?.UserProfile) {
      client.models.UserProfile.list()
        .then((res) => {
          if (res?.data && res.data.length > 0) {
            setProfiles(res.data);
          }
        })
        .catch((err) => {
          console.warn('Live cloud sync fallback to local:', err);
        });
    }
  }, []);

  // Profiles State (persisted in localStorage)
  const [profiles, setProfiles] = useState(() => {
    const saved = localStorage.getItem('profiles_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing stored profiles', e);
      }
    }
    return INITIAL_PROFILES;
  });

  useEffect(() => {
    localStorage.setItem('profiles_data', JSON.stringify(profiles));
  }, [profiles]);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');
  const [viewMode, setViewMode] = useState('grid');

  // Modals & Active Profiles
  const [activeProfile, setActiveProfile] = useState(null);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);
  const [amplifyGuideOpen, setAmplifyGuideOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  // Filter & Sort Logic
  const filteredProfiles = useMemo(() => {
    return profiles
      .filter((profile) => {
        // Search Term Filter
        if (searchTerm.trim()) {
          const query = searchTerm.toLowerCase();
          const matchName = profile.name.toLowerCase().includes(query);
          const matchRole = profile.role.toLowerCase().includes(query);
          const matchEmail = profile.email.toLowerCase().includes(query);
          const matchLocation = profile.location.toLowerCase().includes(query);
          const matchSkills = profile.skills?.some((s) =>
            s.toLowerCase().includes(query)
          );
          if (!matchName && !matchRole && !matchEmail && !matchLocation && !matchSkills) {
            return false;
          }
        }

        // Department Filter
        if (selectedDept !== 'All' && profile.department !== selectedDept) {
          return false;
        }

        // Status Filter
        if (selectedStatus !== 'all' && profile.status !== selectedStatus) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'name-asc') {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === 'name-desc') {
          return b.name.localeCompare(a.name);
        }
        if (sortBy === 'rating') {
          return (b.stats?.rating || 0) - (a.stats?.rating || 0);
        }
        if (sortBy === 'department') {
          return a.department.localeCompare(b.department);
        }
        return 0;
      });
  }, [profiles, searchTerm, selectedDept, selectedStatus, sortBy]);

  const isFiltered =
    searchTerm.trim() !== '' || selectedDept !== 'All' || selectedStatus !== 'all';

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedDept('All');
    setSelectedStatus('all');
  };

  // Toggle Favorite
  const handleToggleFavorite = (id) => {
    setProfiles((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextFav = !p.isFavorite;
          addToast(
            nextFav ? `Added ${p.name} to favorites` : `Removed ${p.name} from favorites`,
            'info'
          );
          return { ...p, isFavorite: nextFav };
        }
        return p;
      })
    );
  };

  // Save (Create or Update)
  const handleSaveProfile = (profileData) => {
    if (profileData.id) {
      // Update
      setProfiles((prev) =>
        prev.map((p) => (p.id === profileData.id ? profileData : p))
      );
      if (activeProfile && activeProfile.id === profileData.id) {
        setActiveProfile(profileData);
      }
      if (isConfigured && client?.models?.UserProfile) {
        client.models.UserProfile.update(profileData).catch(console.error);
      }
      addToast(`Updated profile for ${profileData.name}`, 'success');
    } else {
      // Create new
      const newProfile = {
        ...profileData,
        id: `prof-${Date.now()}`,
        avatarGradient: 'linear-gradient(135deg, #6366f1, #a855f7)',
        joinedDate: 'Just now'
      };
      setProfiles((prev) => [newProfile, ...prev]);

      if (isConfigured && client?.models?.UserProfile) {
        client.models.UserProfile.create({
          email: newProfile.email,
          profileOwner: newProfile.email,
          name: newProfile.name,
          role: newProfile.role,
          department: newProfile.department,
          status: newProfile.status,
          location: newProfile.location,
          phone: newProfile.phone,
          timezone: newProfile.timezone,
          bio: newProfile.bio,
          avatar: newProfile.avatar,
          skills: newProfile.skills,
          isFavorite: newProfile.isFavorite
        })
          .then((res) => {
            if (res?.data?.id) {
              setProfiles((prev) =>
                prev.map((p) => (p.id === newProfile.id ? { ...p, id: res.data.id } : p))
              );
            }
          })
          .catch(console.error);
      }

      addToast(`Added ${newProfile.name} to the directory`, 'success');
    }
  };

  // Delete
  const handleDeleteProfile = (id) => {
    const target = profiles.find((p) => p.id === id);
    if (window.confirm(`Are you sure you want to remove ${target?.name || 'this profile'}?`)) {
      setProfiles((prev) => prev.filter((p) => p.id !== id));
      if (activeProfile && activeProfile.id === id) {
        setActiveProfile(null);
      }
      if (isConfigured && client?.models?.UserProfile) {
        client.models.UserProfile.delete({ id }).catch(console.error);
      }
      addToast(`Profile removed`, 'danger');
    }
  };

  // Copy Email Helper
  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email).then(() => {
      addToast(`Copied ${email} to clipboard!`, 'success');
    });
  };

  // Open Edit Modal
  const handleOpenEdit = (profile) => {
    setEditingProfile(profile);
    setFormModalOpen(true);
  };

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingProfile(null);
    setFormModalOpen(true);
  };

  return (
    <div className="app-container">
      {/* Ambient background glows */}
      <div className="app-bg-glow" />
      <div className="app-bg-glow-2" />

      {/* Navigation Header */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenAddModal={handleOpenAdd}
        onOpenAmplifyGuide={() => setAmplifyGuideOpen(true)}
        isCloudConnected={isConfigured}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {/* Statistics Bar */}
        <StatsBar profiles={profiles} />

        {/* Filters, Search & Controls */}
        <FilterBar
          selectedDept={selectedDept}
          setSelectedDept={setSelectedDept}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          totalResults={filteredProfiles.length}
          onResetFilters={handleResetFilters}
          isFiltered={isFiltered}
        />

        {/* Profiles Content (Grid or List) */}
        {filteredProfiles.length === 0 ? (
          <div className="empty-state animate-fade-in">
            <div className="empty-state-icon">🔍</div>
            <h3>No profiles found</h3>
            <p>
              We couldn't find any team profiles matching your search or filter criteria. Try adjusting your query or filters.
            </p>
            <button className="btn-primary" onClick={handleResetFilters}>
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="profiles-grid">
            {filteredProfiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onView={(p) => setActiveProfile(p)}
                onEdit={handleOpenEdit}
                onDelete={handleDeleteProfile}
                onToggleFavorite={handleToggleFavorite}
                onCopyEmail={handleCopyEmail}
              />
            ))}
          </div>
        ) : (
          <div className="profiles-list-table-wrapper animate-fade-in">
            <table className="profiles-table">
              <thead>
                <tr>
                  <th>Team Member</th>
                  <th>Role & Dept</th>
                  <th>Status</th>
                  <th>Location</th>
                  <th>Key Skills</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProfiles.map((profile) => (
                  <ProfileListItem
                    key={profile.id}
                    profile={profile}
                    onView={(p) => setActiveProfile(p)}
                    onEdit={handleOpenEdit}
                    onDelete={handleDeleteProfile}
                    onToggleFavorite={handleToggleFavorite}
                    onCopyEmail={handleCopyEmail}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Profile Detail Modal */}
      <ProfileDetailModal
        profile={activeProfile}
        onClose={() => setActiveProfile(null)}
        onEdit={handleOpenEdit}
        onDelete={handleDeleteProfile}
        onCopyEmail={handleCopyEmail}
      />

      {/* Add / Edit Profile Form Modal */}
      <ProfileFormModal
        key={editingProfile ? editingProfile.id : (formModalOpen ? 'new-open' : 'new-closed')}
        isOpen={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        onSave={handleSaveProfile}
        initialData={editingProfile}
      />

      {/* Amplify Guide Modal */}
      <AmplifyGuideModal
        isOpen={amplifyGuideOpen}
        onClose={() => setAmplifyGuideOpen(false)}
      />

      {/* Toast Notifications */}
      <Toast toasts={toasts} />
    </div>
  );
}
