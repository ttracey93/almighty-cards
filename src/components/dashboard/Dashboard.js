import React from 'react';
import {
  BrowserRouter as Router, Route,
} from 'react-router-dom';

// import Home from './Home';
import Search from './Search';

const Dashboard = () => (
  <Router>
    <div className="flex dashboard">
      {/* TODO: Dashboard Header/Toolbar here? */}
      {/* Landing page for all users */}
      <Route exact path="/" component={Search} />
      <Route exact path="/dashboard" component={Search} />
    </div>
  </Router>
);

export default Dashboard;
