import React from 'react';
import { FaGithub, FaYoutube, FaLinkedin } from 'react-icons/fa';
import './PreviewPage.scss';

const PreviewPage = ({ userProfile = {} }) => {
  // Destructure with default values to avoid undefined errors
  const { profilePicture = '', firstName = '', lastName = '', email = 'No Email Provided', links = [] } = userProfile;

  const getIconForPlatform = (platform) => {
    switch (platform?.toLowerCase()) {
      case 'github':
        return <FaGithub />;
      case 'youtube':
        return <FaYoutube />;
      case 'linkedin':
        return <FaLinkedin />;
      default:
        return null;
    }
  };

  const getClassNameForPlatform = (platform) => {
    switch (platform?.toLowerCase()) {
      case 'github':
        return 'link-item github';
      case 'youtube':
        return 'link-item youtube';
      case 'linkedin':
        return 'link-item linkedin';
      default:
        return 'link-item';
    }
  };

  return (
    <div className="preview-page">
      <div className="profile-card">
        {/* Profile Section */}
        <div className='profile-image-container'>
          {profilePicture ? (
            <img
              src={profilePicture}
              alt="Profile"
              className="profile-image"
            />
          ) : (
            <div className="profile-image-placeholder">No Image</div>
          )}
        </div>
        
        <div className='profile-details'>
          <h2 className="profile-name">{`${firstName} ${lastName}`}</h2>
          <p className="profile-email">{email}</p>  
        </div>

        {/* Links Section */}
        {links.length > 0 ? (
          <div className="links-container">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={getClassNameForPlatform(link.platform)}
              >
                {getIconForPlatform(link.platform)}
                <span>{link.platform}</span>
              </a>
            ))}
          </div>
        ) : (
          <p className="no-links-message">No links added yet</p>
        )}
      </div>
    </div>
  );
};

export default PreviewPage;
