import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Header.scss';
import Logo from '../../assets/logo-head.png'; // Import the logo image correctly

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={Logo} alt="Logo" /> {/* Correctly render the logo */}
        devlinks
      </div>
      <nav className="header__nav">
        {/* Update anchor tags to Link components */}
        <Link to="/links" className="header__link">Links</Link>
        <Link to="/" className="header__link">Profile Details</Link>
        <Link to="/preview" className="header__button">Preview</Link> {/* Button-style link */}
      </nav>
    </header>
  );
};

export default Header;
