import React from 'react';
import { FaGithub, FaYoutube, FaLinkedin } from 'react-icons/fa';
import './PreviewPage.scss';

const PreviewPage = ({ userProfile }) => {
  const getIconForPlatform = (platform) => {
    switch (platform.toLowerCase()) {
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

  return (
    <div className="preview-page">
      <div className="profile-card">
        {userProfile.profilePicture ? (
          <img
            src={userProfile.profilePicture}
            alt="Profile"
            className="profile-image"
          />
        ) : (
          <div className="profile-image-placeholder">
            {/* Optional: Some placeholder image or text */}
            No profile picture available
          </div>
        )}

        <h2 className="profile-name">{userProfile.name || 'No name provided'}</h2>
        <p className="profile-email">{userProfile.email || 'No email provided'}</p>

        <div className="links-container">
          {userProfile.links.length > 0 ? (
            userProfile.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-item"
              >
                {getIconForPlatform(link.platform)}
                <span>{link.platform}</span>
              </a>
            ))
          ) : (
            <p>No links available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
