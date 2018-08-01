import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ user }) => (
  <div className="app-footer">
    <Link to="/" className="logo-link">
      <i className="fa fa-copyright"></i>
    </Link>

    <Link to="/" className="brand-link">
      Almighty Cards
    </Link>

    <Link to="/dashboard" className="dashboard-link">
      <i className="fa fa-home"></i>
      Dashboard
    </Link>
  </div>
);

export default Footer;
