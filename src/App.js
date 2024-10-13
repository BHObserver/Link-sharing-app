import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserProfileForm from './components/user-profile-form/UserProfileForm';
import LinksPage from './components/link-page/LinkPage';
import Header from './components/header/Header';
import PreviewPage from './components/preview/PreviewPage';

import './App.scss'

const App = () => {
  // Shared state for profile and links
  const [userProfile, setUserProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    profilePicture: '',
    links: [],
  });

  // Handlers to update the profile and links state
  const handleProfileChange = (updatedProfile) => {
    setUserProfile((prev) => ({
      ...prev,
      ...updatedProfile,
    }));
  };

  const handleLinksChange = (updatedLinks) => {
    setUserProfile((prev) => ({
      ...prev,
      links: updatedLinks,
    }));
  };

  return (
    <Router>
      <Header /> {/* Header stays across all pages */}
      <div>
        <Routes>
          <Route 
            path="/" 
            element={<UserProfileForm userProfile={userProfile} onProfileChange={handleProfileChange} />} 
          />
          <Route 
            path="/links" 
            element={<LinksPage links={userProfile.links} onLinksChange={handleLinksChange} />} 
          />
          <Route 
            path="/preview" 
            element={<PreviewPage userProfile={userProfile} />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
