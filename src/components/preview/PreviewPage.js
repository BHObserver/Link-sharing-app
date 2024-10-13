import React, { useEffect, useState } from 'react';
import { FaGithub, FaYoutube, FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';
import './PreviewPage.scss';

const PreviewPage = ({ userProfile = {} }) => {
  const [profPic, setProfPic] = useState(userProfile.profilePicture || '');
  const [name, setName] = useState(`${userProfile.firstName || ''} ${userProfile.lastName || ''}`);
  const [emailData, setEmailData] = useState(userProfile.email || '');
  const [links, setLinks] = useState(userProfile.links || []);

  // Load data from localStorage if not provided by userProfile
  useEffect(() => {
    console.log("User Profile Data: ", userProfile); // Debugging line

    // Load user data from localStorage
    const storedProfile = JSON.parse(localStorage.getItem('userProfile'));

    if (storedProfile) {
      setProfPic(storedProfile.profilePicture || '');
      setName(`${storedProfile.firstName || ''} ${storedProfile.lastName || ''}`);
      setEmailData(storedProfile.email || '');
      setLinks(storedProfile.links || []);
    } else if (userProfile.links && userProfile.links.length > 0) {
      setLinks(userProfile.links); // Populate with userProfile links if they exist
    }
  }, [userProfile]);

  useEffect(() => {
    console.log("User Profile Data: ", userProfile); // Debugging line
    if (!userProfile.links || userProfile.links.length === 0) {
      const savedLinks = localStorage.getItem('userLinks');
      if (savedLinks) {
        setLinks(JSON.parse(savedLinks));
      }
    } else {
      setLinks(userProfile.links); // Populate with userProfile links if they exist
    }
  }, [userProfile]);

  const { profilePicture = '', firstName = '', lastName = '', email = '', links: userLinks = [] } = userProfile;

  const getIconForPlatform = (platform) => {
    switch (platform?.toLowerCase()) {
      case 'github':
        return <FaGithub />;
      case 'youtube':
        return <FaYoutube />;
      case 'linkedin':
        return <FaLinkedin />;
      case 'instagram':
        return <FaInstagram />;
      case 'twitter':
        return <FaTwitter />;
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
      case 'instagram':
        return 'link-item instagram';
      case 'twitter':
        return 'link-item twitter';
      default:
        return 'link-item';
    }
  };

  return (
    <div className="preview-page">
      <div className="profile-card">
        {/* Profile Section */}
        <div className='profile-image-container'>
          {profPic ? (
            <img
              src={profPic}
              alt="Profile"
              className="profile-image"
            />
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
