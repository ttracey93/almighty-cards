import React from 'react';
import _ from 'lodash';
// import { toast } from 'react-toastify';
import Tile from '../cards/Tile';

class Deck extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
    };
  }

  getCard(card) {
    return <Tile key={card.id} card={card} draggable={false} />;
  }

  render() {
    const cards = this.state.cards && this.state.cards.length > 0;

    return (
      <div className="your-deck">
        <h1>
          This is your deck
        </h1>

        <p>
          Drag and drop cards here to add them to your deck
        </p>

        <div className="cards">
          {cards
            && _.map(this.state.cards, this.getCard)
          }

          {!cards
            && <p>Your deck is currently empty</p>
          }
        </div>
      </div>
    );
  }
}

export default Deck;
