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
        <img
          src={userProfile.profilePicture}
          alt="Profile"
          className="profile-image"
        />
        <h2 className="profile-name">{userProfile.name}</h2>
        <p className="profile-email">{userProfile.email}</p>

        <div className="links-container">
          {userProfile.links.map((link, index) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
