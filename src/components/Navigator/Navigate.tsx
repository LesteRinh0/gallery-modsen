import { Link } from 'react-router-dom';

import navLogo from '@assets/navLogo.png';

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
          <Link to="/images">Images</Link>
        </li>
        <li className="favourities">
          <Link to="/favourites">Favourites</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigate;
