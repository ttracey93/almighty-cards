import React from 'react';
import Search from '../dashboard/Search';
import DeckTray from './DeckTray';

const DeckBuilder = () => (
  <div className="deck-builder">
    <Search />
    <DeckTray />
  </div>
);

export default DeckBuilder;
