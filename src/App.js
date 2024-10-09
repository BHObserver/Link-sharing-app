import React, { useState } from 'react';
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

  const handleToggleView = () => {
    setIsPreviewVisible(!isPreviewVisible);
  };

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
