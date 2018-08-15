import React from 'react';
import { DropTarget } from 'react-dnd';
import _ from 'lodash';
import { toast } from 'react-toastify';
import uuid from 'uuid/v4';
import Tile from '../cards/Tile';
import DeckService from '../../services/DeckService';

class DeckTray extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deckId: props.match.params.id,
      cards: [],
    };

    this.getCard = this.getCard.bind(this);
    this.getCardStack = this.getCardStack.bind(this);
    this.getDeckContent = this.getDeckContent.bind(this);
  }

  async componentDidMount() {
    const cards = await DeckService.getCards(this.state.deckId);

    if (cards && cards.length) {
      this.setState({
        cards,
      });
    }
  }

  getCard(card) {
    return <Tile key={uuid()} card={card} draggable={false} />;
  }

  getCardStack(cards) {
    return (
      <div className="card-stack">
        {_.map(cards, this.getCard)}
      </div>
    );
  }

  getDeckContent() {
    const groupedCards = _.groupBy(this.state.cards, 'id');
    return _.map(groupedCards, this.getCardStack);
  }

  render() {
    const connect = this.props.connectDropTarget;

    return connect(
      <div className="your-deck">
        <h1>
          This is your deck
        </h1>

        <p>
          Drag and drop cards here to add them to your deck
        </p>

        <div className="cards">
          {this.getDeckContent()}
        </div>
      </div>,
    );
  }
}

const spec = {
  drop: (props, monitor, component) => {
    const item = monitor.getItem();

    const { cards } = component.state;

    if (item && item.card) {
      // DeckService.addCard();
      const current = _.groupBy(cards, 'id')[item.card.id];

      if (current && current.length && current.length > 2) {
        toast.error(`You already have 3 copies of "${item.card.name}" in your deck`);
      } else {
        cards.push(item.card);

        DeckService.addCard(
          item.card.id,
          component.state.deckId,
        ).then((response) => {
          component.setState({
            cards,
          });
        }).catch((ex) => {
          toast.error(ex.message);
        });
      }
    }
  },
  hover: () => {
  },
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
});

export default DropTarget('CARD', spec, collect)(DeckTray);
