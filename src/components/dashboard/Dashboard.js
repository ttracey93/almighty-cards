import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import Home from './Home';
import Search from './Search';
import Card from '../cards/Card';
import Deck from '../decks/Deck';
import DeckBuilder from '../decks/DeckBuilder';
import CreateDeck from '../decks/Create';

const Dashboard = ({ user }) => (
  <div className="flex dashboard">
    {/* TODO: Dashboard Header/Toolbar here? */}
    {/* Landing page for all users */}
    <Route exact path="/" component={Search} />
    <Route exact path="/dashboard" render={props => <Home {...props} user={user} />} />
    <Route exact path="/cards/:id" component={Card} />

    <Switch>
      <Route exact path="/decks/create" render={props => <CreateDeck {...props} user={user} />} />
      <Route exact path="/decks/:id" component={Deck} />
      <Route exact path="/decks/:id/build" component={DeckBuilder} />
    </Switch>
  </div>
);

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Dashboard;
