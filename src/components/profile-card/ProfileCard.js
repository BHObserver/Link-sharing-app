import React from 'react';
import './ProfileCard.scss';

const ProfileCard = ({ imageUrl, name, email, links }) => {
  return (
    <div className="profile-card">
      <div className="profile-card__image-wrapper">
        <img src={imageUrl} alt={`${name}'s avatar`} className="profile-card__image" />
      </div>
      <div className="profile-card__details">
        <h2 className="profile-card__name">{name}</h2>
        <p className="profile-card__email">{email}</p>
      </div>
      <div className="profile-card__links">
        {links.map((link, index) => (
          <a href={link.url} key={index} className={`profile-card__link profile-card__link--${link.platform.toLowerCase()}`}>
            {link.platform}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProfileCard;
