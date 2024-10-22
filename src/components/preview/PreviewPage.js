import React, { useEffect, useState } from 'react';
import { FaGithub, FaYoutube, FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';
import './PreviewPage.scss';

const PreviewPage = ({ userProfile = {} }) => {
  const [profPic, setProfPic] = useState('');
  const [name, setName] = useState('');
  const [emailData, setEmailData] = useState('');
  const [links, setLinks] = useState([]);

  // Load data from localStorage and userProfile
  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem('userProfile'));
    const savedLinks = JSON.parse(localStorage.getItem('userLinks')) || [];

    if (storedProfile) {
      setProfPic(storedProfile.profilePicture || '');
      setName(`${storedProfile.firstName || ''} ${storedProfile.lastName || ''}`);
      setEmailData(storedProfile.email || '');
      setLinks(storedProfile.links || savedLinks);
    } else {
      setLinks(userProfile.links || savedLinks);
      setProfPic(userProfile.profilePicture || '');
      setName(`${userProfile.firstName || ''} ${userProfile.lastName || ''}`);
      setEmailData(userProfile.email || '');
    }
  }, [userProfile]);

  const getIconForPlatform = (platform) => {
    switch (platform?.toLowerCase()) {
      case 'github': return <FaGithub />;
      case 'youtube': return <FaYoutube />;
      case 'linkedin': return <FaLinkedin />;
      case 'instagram': return <FaInstagram />;
      case 'twitter': return <FaTwitter />;
      default: return null;
    }
  };

  const getClassNameForPlatform = (platform) => {
    switch (platform?.toLowerCase()) {
      case 'github': return 'link-item github';
      case 'youtube': return 'link-item youtube';
      case 'linkedin': return 'link-item linkedin';
      case 'instagram': return 'link-item instagram';
      case 'twitter': return 'link-item twitter';
      default: return 'link-item';
    }
  };

  return (
    <div className="preview-page">
      <div className="profile-card">
        {/* Profile Section */}
        <div className='profile-image-container'>
          {profPic ? (
            <img src={profPic} alt="Profile" className="profile-image" />
          ) : (
            <div className="profile-image-placeholder"></div>
          )}
        </div>

        <div className='profile-details'>
          <h2 className="profile-name">{name}</h2>
          <p className="profile-email">{emailData}</p>  
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
          <p className="no-links-message">No links available</p>
        )}
      </div>
    </div>
  );
};

export default PreviewPage;
