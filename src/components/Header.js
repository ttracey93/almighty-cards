import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Search from './HeaderSearch';

const Header = ({ user, login, logout }) => (
  <div className="app-bar">
    {/* <Link to="/" className="logo-link">
      <img
        alt="Almighty Cards Logo"
        className="app-svg"
        src="/cards.svg"
      />
    </Link> */}

    <Link to="/" className="brand-link">
      Almighty Games and More
    </Link>

    <Search></Search>

    {user && (
      <span className="flex app-actions">
        <div className="active-user">
          {user.displayName}
        </div>

        <Link to="/dashboard" className="logout-button">
          <i className="fa fa-credit-card login-icon"></i>
          My Deck Profiles
        </Link>

        <a className="logout-button" onClick={logout}>
          <i className="fa fa-sign-out login-icon"></i>
          Logout
        </a>
      </span>
    )}

    {!user && (
      <span className="flex app-actions">
        <a onClick={login} className="login-button">
          <i className="fa fa-google login-icon"></i>
          Login with Google
        </a>
      </span>
    )}
  </div>
);

Header.propTypes = {
  user: PropTypes.object,
  login: PropTypes.func,
  logout: PropTypes.func,
};


export default Header;
