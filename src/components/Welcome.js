import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => (
  <div className="flex welcome">
    <div className="welcome-banner">
      <span className="header">
        Welcome to Amazing Cards!
      </span>

      <button className="create-now">
        <Link to="/dashboard">
          Start searching now!
        </Link>
      </button>
    </div>
  </div>
);

export default Welcome;
