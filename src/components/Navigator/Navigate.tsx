import { useState } from 'react';
import { Link } from 'react-router-dom';

import Favorites from '@assets/icons/Favorities.svg';
import Image from '@assets/icons/Image.svg';
import Category from '@assets/icons/Vector.svg';
import navLogo from '@assets/navLogo.svg';

import './Navigate.css';

const Navigate = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((isMenuOpen) => !isMenuOpen);
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <img src={navLogo} alt="Modsen Gallery" />
      </Link>

      <button className="burger-menu-button" onClick={toggleMenu}>
        ☰
      </button>

      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li className="category">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <img src={Category} alt={'favorites'} />
            Category
          </Link>
        </li>
        <li className="images">
          <Link to="/search" onClick={() => setIsMenuOpen(false)}>
            <img src={Image} alt={'favorites'} />
            Images
          </Link>
        </li>
        <li className="favourities">
          <Link to="/favourites" onClick={() => setIsMenuOpen(false)}>
            <img src={Favorites} alt={'favorites'} />
            Favorites
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigate;
