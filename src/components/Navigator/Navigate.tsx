import { Link } from 'react-router-dom';

import navLogo from '@assets/navLogo.svg';

import './Navigate.css';

const Navigate = () => {
  return (
    <nav>
      <img src={navLogo} alt="Modsen Gallery" />
      <ul>
        <li className="category">
          <Link to="/">Category</Link>
        </li>
        <li className="images">
          <Link to="/search">Images</Link>
        </li>
        <li className="favourities">
          <Link to="/favourites">Favorites</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigate;
