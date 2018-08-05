import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Tile extends Component {
  constructor(props) {
    super(props);

    // const urlName = props.card.name.replace(/ /g, '%20');
    const url = `/decks/${props.deck.id}`;

    this.state = {
      loading: true,
      url,
      imageUrl: '/deck.jpg',
    };
  }

  render() {
    return (
      <div className="deck-tile">
        <Link to={this.state.url}>
          <img
            alt={this.props.deck.name}
            onLoad={this.onImageLoaded}
            onError={this.onImageNotFound}
            src={this.state.imageUrl}
          />

          <span className="deck-name">
            {this.props.deck.name}
          </span>
        </Link>
      </div>
    );
  }
}

Tile.propTypes = {
  deck: PropTypes.object.isRequired,
};

export default Tile;
