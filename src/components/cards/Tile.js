import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BarLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { DragSource } from 'react-dnd';

const cardSource = {
  beginDrag(props) {
    return {
      card: props.card,
    };
  },
  canDrag(props) {
    return props.draggable;
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

class Tile extends Component {
  constructor(props) {
    super(props);

    // const urlName = props.card.name.replace(/ /g, '%20');
    const url = `/cards/${props.card.attributes.id}`;

    this.state = {
      loading: true,
      url,
    };

    this.onImageLoaded = this.onImageLoaded.bind(this);
    this.onImageNotFound = this.onImageNotFound.bind(this);
  }


  componentDidMount() {
    const imageUrl = `http://localhost:3001/images/${this.props.card.attributes.id}.jpg`;
    this.setState({
      imageUrl,
    });
  }

  onImageLoaded() {
    this.setState({
      loading: false,
    });
  }

  onImageNotFound() {
    this.setState({
      imageUrl: '/images/blank-card.jpg',
    });
  }

  render() {
    const { loading } = this.state;
    const { isDragging, connectDragSource, clickable } = this.props;

    return connectDragSource(
      <div className="card-tile" style={{ opacity: isDragging ? 0.5 : 1 }}>
        {loading
          && <div className="card-tile-loader">
            <BarLoader color="white" />
          </div>
        }

        {clickable
          && <Link to={this.state.url}>
            <img
              alt={this.props.card.name}
              onLoad={this.onImageLoaded}
              onError={this.onImageNotFound}
              src={this.state.imageUrl}
            />
          </Link>
        }

        {!clickable
          && <img
            alt={this.props.card.name}
            onLoad={this.onImageLoaded}
            onError={this.onImageNotFound}
            src={this.state.imageUrl}
          />
        }
      </div>,
    );
  }
}

Tile.propTypes = {
  card: PropTypes.object.isRequired,

  // Injected by React DnD:
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
};

export default DragSource('CARD', cardSource, collect)(Tile);
