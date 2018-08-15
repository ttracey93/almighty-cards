import React from 'react';
import Search from '../dashboard/Search';
import DeckTray from './DeckTray';

const DeckBuilder = ({ match }) => (
  <div className="deck-builder">
    <Search clickable={false} />
    <DeckTray match={match} />
  </div>
);

export default DeckBuilder;
