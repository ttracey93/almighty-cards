import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ user }) => (
  <div className="app-footer">
    <Link to="/" className="logo-link">
      {/* <i className="fa fa-copyright"></i> */}

      <img
        src="/TempLogo.png"
        alt="Temp Logo"
      />
    </Link>

    <Link to="/" className="brand-link">
      Almighty Games and More
    </Link>

    <div className="footer-links">
      <Link to="/about">
        About
      </Link>

      <Link to="/contact">
        Contact
      </Link>
    </div>
  </div>
);

export default Footer;
