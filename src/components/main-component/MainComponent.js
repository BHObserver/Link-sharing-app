import React, { useState } from 'react';
import UserProfileForm from '../user-profile-form/UserProfileForm';
import LinksPage from '../link-section/LinkSection';
import PreviewPage from '../preview/PreviewPage';
import './MainComponent.scss';

const MainComponent = () => {
  // Profile and Links State
  const [userProfile, setUserProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    profilePicture: '',
    links: [],
  });

  // Update profile details
  const handleProfileChange = (updatedProfile) => {
    setUserProfile((prev) => ({
      ...prev,
      ...updatedProfile,
    }));
  };

  // Update links
  const handleLinksChange = (updatedLinks) => {
    setUserProfile((prev) => ({
      ...prev,
      links: updatedLinks,
    }));
  };

  return (
    <div className="main-component">
      {/* Profile Form */}
      <UserProfileForm userProfile={userProfile} onProfileChange={handleProfileChange} />
      
      {/* Links Form */}
      <LinksPage links={userProfile.links} onLinksChange={handleLinksChange} />

      {/* Preview Section */}
      <div className="preview-container">
        <h2>Preview</h2>
        <PreviewPage userProfile={{
          profilePicture: userProfile.profilePicture,
          name: `${userProfile.firstName} ${userProfile.lastName}`,
          email: userProfile.email,
          links: userProfile.links,
        }} />
      </div>
    </div>
  );
};

export default MainComponent;
