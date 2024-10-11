import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">devlinks</div>
      <nav className="header__nav">
        {/* Update anchor tags to Link components */}
        <Link to="/links" className="header__link">Links</Link>
        <Link to="/" className="header__link">Profile Details</Link>
        {/* If you have a separate preview page, you can add the Link to it here */}
        <Link to="/preview" className="header__button">Preview</Link>
      </nav>
    </header>
  );
};

export default Header;
