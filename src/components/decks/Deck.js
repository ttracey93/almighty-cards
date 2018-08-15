import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
// import { toast } from 'react-toastify';
import uuid from 'uuid/v4';
import { Link } from 'react-router-dom';
import Tile from '../cards/Tile';
import DeckService from '../../services/DeckService';
import DeckTray from './DeckTray';

class Deck extends React.Component {
  constructor(props) {
    super(props);

    const deckBuilderUrl = `/decks/${props.match.params.id}/build`;

    this.state = {
      cards: [],
      deckBuilderUrl,
      deckId: props.match.params.id,
    };
  }

  getCard(card) {
    return <Tile key={uuid()} card={card} draggable={false} />;
  }

  render() {
    const cards = this.state.cards && this.state.cards.length > 0;

    return (
      <div className="deck-page">
        {/* <div className="cards">
          {cards
            && _.map(this.state.cards, this.getCard)
          }

          {!cards
            && <p>Your deck is currently empty</p>
          }
        </div> */}

        <Link to={this.state.deckBuilderUrl} className="button">
          Deck Builder
        </Link>

        <DeckTray match={this.props.match} />
      </div>
    );
  }
}

Deck.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Deck;
