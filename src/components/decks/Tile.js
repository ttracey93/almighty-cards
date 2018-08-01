import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SyncLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

class Tile extends Component {
  constructor(props) {
    super(props);

    // const urlName = props.card.name.replace(/ /g, '%20');
    const url = `/decks/${props.deck.id}`;

    this.state = {
      loading: true,
      url,
      imageUrl: '/images/blank-card.jpg',
    };
  }

  render() {
    const { loading } = this.state;
    const { isDragging, connectDragSource } = this.props;

    return connectDragSource(
      <div className="card-tile" style={{ opacity: isDragging ? 0.5 : 1 }}>
        {loading
          && <div className="card-tile-loader">
            <SyncLoader color="white"></SyncLoader>
          </div>
        }

        <Link to={this.state.url}>
          <img
            alt={this.props.card.name}
            onLoad={this.onImageLoaded}
            onError={this.onImageNotFound}
            src={this.state.imageUrl}
          />
        </Link>
      </div>,
    );
  }
}

Tile.propTypes = {
  deck: PropTypes.object.isRequired,

  // Injected by React DnD:
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
};

export default Tile;
