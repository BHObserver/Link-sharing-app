import React, { useState, useEffect, useCallback } from 'react';
import './App.scss';
import Header from './components/header/Header';
import UserProfileForm from './components/user-profile-form/UserProfileForm';
import PreviewPage from './components/preview/PreviewPage';

function App() {
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    profilePicture: '',
    links: [],
  });

  // Persist user data to localStorage
  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      setUserProfile(JSON.parse(storedProfile));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [userProfile]);

  // Toggle View
  const handleToggleView = useCallback(() => {
    setIsPreviewVisible((prev) => !prev);
  }, []);

  return (
    <div className="App">
      <Header />
      <button className="toggle-button" onClick={handleToggleView}>
        {isPreviewVisible ? 'Edit Profile' : 'View Preview'}
      </button>
      {isPreviewVisible ? (
        <PreviewPage userProfile={userProfile} />
      ) : (
        <UserProfileForm setUserProfile={setUserProfile} />
      )}
    </div>
  );
}

export default App;
