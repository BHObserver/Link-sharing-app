import React from 'react';
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">devlinks</div>
      <nav className="header__nav">
        <a href="#links" className="header__link">Links</a>
        <a href="#profile-details" className="header__link">Profile Details</a>
        <button className="header__button">Preview</button>
      </nav>
    </header>
  );
};

export default Header;
