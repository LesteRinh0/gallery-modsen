import navLogo from '@assets/navLogo.svg';
import instagram from '@assets/socials/instagram.svg';
import twitter from '@assets/socials/twitter.svg';
import facebook from '@socials/facebook.svg';
import github from '@socials/github.svg';

import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-section">
          <img src={navLogo} alt="Modsen Gallery" className="footer-logo" />
          <p className="footer-description">
            We have images that capture every mood and inspire every vision. From breathtaking landscapes to vibrant
            portraits.
          </p>
          <div className="footer-socials">
            <a href="#" className="social-icon">
              <img src={twitter} alt="twitter" />
            </a>
            <a href="#" className="social-icon">
              <img src={facebook} alt="facebook" />
            </a>
            <a href="#" className="social-icon">
              <img src={instagram} alt="instagram" />
            </a>
            <a href="#" className="social-icon">
              <img src={github} alt="github" />
            </a>
          </div>
        </div>
        <div className="footer-section">
          <h1 className="footer-title">COMPANY</h1>
          <ul className="footer-list">
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Features</a>
            </li>
            <li>
              <a href="#">Works</a>
            </li>
            <li>
              <a href="#">Career</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h1 className="footer-title">HELP</h1>
          <ul className="footer-list">
            <li>
              <a href="#">Customer Support</a>
            </li>
            <li>
              <a href="#">Delivery Details</a>
            </li>
            <li>
              <a href="#">Terms & Conditions</a>
            </li>
            <li>
              <a href="#">Private Policy</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h1 className="footer-title">FAQ</h1>
          <ul className="footer-list">
            <li>
              <a href="#">Account</a>
            </li>
            <li>
              <a href="#">Manage Deliveries</a>
            </li>
            <li>
              <a href="#">Orders</a>
            </li>
            <li>
              <a href="#">Payments</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h1 className="footer-title">RESOURCES</h1>
          <ul className="footer-list">
            <li>
              <a href="#">Free eBooks</a>
            </li>
            <li>
              <a href="#">Development Tutorial</a>
            </li>
            <li>
              <a href="#">How to - Blog</a>
            </li>
            <li>
              <a href="#">Youtube playlist</a>
            </li>
          </ul>
        </div>
      </div>
      <h6 className="footer-copyright">Modsen.gallery © 2000-2025, All Rights Reserved</h6>
    </footer>
  );
};

export default Footer;
