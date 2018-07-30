import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SyncLoader } from 'react-spinners';
import { Storage } from '../../firebase';

class Tile extends Component {
  constructor(props) {
    super(props);

    const urlName = props.card.name.replace(/ /g, '%20');
    const url = `https://db.ygoprodeck.com/card/?search=${urlName}`;

    this.state = {
      loading: true,
      url,
    };

    this.onImageLoaded = this.onImageLoaded.bind(this);
    this.onImageNotFound = this.onImageNotFound.bind(this);
  }

  componentDidMount() {
    Storage.ref(`images/cards/${this.props.card.id}.jpg`).getDownloadURL().then((imageUrl) => {
      this.setState({
        imageUrl,
      });
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

    return (
      <div className="card-tile">
        {loading
          && <div className="card-tile-loader">
            <SyncLoader color="white"></SyncLoader>
          </div>
        }

        <a href={this.state.url} target="_blank" rel="noopener noreferrer">
          <img
            alt={this.props.card.name}
            onLoad={this.onImageLoaded}
            onError={this.onImageNotFound}
            src={this.state.imageUrl}
          />
        </a>
      </div>
    );
  }
}

Tile.propTypes = {
  card: PropTypes.object.isRequired,
};

export default Tile;
