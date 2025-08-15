import navLogo from '@assets/navLogo.svg';
import instagram from '@assets/socials/instagram.svg';
import twitter from '@assets/socials/twitter.svg';
import facebook from '@socials/facebook.svg';
import github from '@socials/github.svg';

import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div>
          <img src={navLogo} alt="Modsen Gallery" />
          <h3>
            We have images that capture every mood and inspire every vision. From breathtaking landscapes to vibrant
            portraits.
          </h3>
          <div className="socials">
            <img src={twitter} alt="twitter" />
            <img src={facebook} alt="facebook" />
            <img src={instagram} alt="instagram" />
            <img src={github} alt="github" />
          </div>
        </div>
        <div>
          <h1>COMPANY</h1>
          <li>About</li>
          <li>Features</li>
          <li>Works</li>
          <li>Career</li>
        </div>
        <div>
          <h1>HELP</h1>
          <li>Customer Support</li>
          <li>Delivery Details</li>
          <li>Terms & Conditions</li>
          <li>Private Policy</li>
        </div>
        <div>
          <h1>FAQ</h1>
          <li>Account</li>
          <li>Manage Deliveries</li>
          <li>Orders</li>
          <li>Payments</li>
        </div>
        <div>
          <h1>RESOURCES</h1>
          <li>Free eBooks</li>
          <li>Development Tutorial</li>
          <li>How to - Blog</li>
          <li>Youtube playlist</li>
        </div>
      </div>
      <h6>Modsen.gallery © 2000-2025, All Rights Reserved</h6>
    </footer>
  );
};

export default Footer;
