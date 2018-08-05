import React from 'react';
import Search from '../dashboard/Search';
import Deck from './Deck';

const DeckBuilder = () => (
  <div className="deck-builder">
    <Search></Search>
    <Deck></Deck>
  </div>
);

export default DeckBuilder;
