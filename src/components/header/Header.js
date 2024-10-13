import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.scss';
import Logo from '../../assets/logo-head.png';
import { FaLink, FaUser, FaEye } from 'react-icons/fa'; // Import FaEye for preview button icon

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div class="header__logo">
        <img src="/static/media/logo-head.367a681514fb6cbf9b40.png" alt="Logo" />
        <span class="header__text">devlinks</span>
      </div>


      <nav className="header__nav">
        <Link 
          to="/links" 
          className={`header__link ${location.pathname === '/links' ? 'active' : ''}`}
        >
          <FaLink className="header__icon" /> {/* Icon stays visible */}
          <span className="header__text">Links</span> {/* Text to be hidden on mobile */}
        </Link>
        <Link 
          to="/" 
          className={`header__link ${location.pathname === '/' ? 'active' : ''}`}
        >
          <FaUser className="header__icon" />
          <span className="header__text">Profile Details</span>
        </Link>
      </nav>

      <nav className="header__nav">
        <Link to="/preview" className="header__button">
          <FaEye className="header__icon" /> {/* Add icon for the preview button */}
          <span className="header__text">Preview</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
