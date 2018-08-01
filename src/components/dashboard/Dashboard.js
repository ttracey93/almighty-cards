import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router, Route,
} from 'react-router-dom';

import Home from './Home';
import Search from './Search';
import Card from '../cards/Card';

const Dashboard = ({ user }) => (
  <Router>
    <div className="flex dashboard">
      {/* TODO: Dashboard Header/Toolbar here? */}
      {/* Landing page for all users */}
      <Route exact path="/" component={Search} />
      <Route exact path="/dashboard" render={props => <Home {...props} user={user} />} />
      <Route exact path="/cards/:id" component={Card} />
    </div>
  </Router>
);

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Dashboard;
