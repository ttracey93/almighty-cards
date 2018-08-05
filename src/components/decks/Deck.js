import React from 'react';
import { DropTarget } from 'react-dnd';
import _ from 'lodash';
import { toast } from 'react-toastify';
import Tile from '../cards/Tile';

const cards = [];

function getCard(card) {
  return <Tile key={card.id} card={card} />;
}

const Deck = ({ match, connectDropTarget }) => connectDropTarget(
  <div className="your-deck">
    <h1>
      This is your deck
    </h1>

    <p>
      Drag and drop cards here to add them to your deck
    </p>

    <div className="cards">
      {_.map(cards, getCard)}
    </div>
  </div>,
);

const spec = {
  drop: (props, monitor, component) => {
    const item = monitor.getItem();

    if (item && item.card) {
      // DeckService.addCard();
      const current = _.groupBy(cards, 'id')[item.card.id];

      if (current && current.length && current.length > 2) {
        toast.error(`You already have 3 copies of "${item.card.name}" in your deck`);
      } else {
        toast.success('Card added to deck!');
        cards.push(item.card);
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

export default DropTarget('CARD', spec, collect)(Deck);
