import React, { Component } from 'react';
import { PacmanLoader } from 'react-spinners';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import uuid from 'uuid/v4';
import DeckService from '../../services/DeckService';
import Tile from '../decks/Tile';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    const decks = await DeckService.getAllForUser(this.props.user.uid);
    this.setState({
      decks,
      loading: false,
    });
  }

  getDeck(deck) {
    return <Tile key={uuid()} deck={deck} />;
  }

  getContent() {
    if (this.state.loading) {
      return (
        <div className="cards-loader">
          <PacmanLoader
            className="cards-loader"
            color="#AEBBFF"
            size={50}
            loading={this.state.loading}
          />
        </div>
      );
    }

    if (this.state.decks && this.state.decks.length) {
      const showCreate = this.state.decks.length < 5;

      return (
        <div className="decks-wrapper">
          {showCreate
            && <Link to="/decks/create">
              <button className="button">
                <i className="fa fa-plus"></i>
                Create a new deck
              </button>
            </Link>
          }

          <div className="decks">
            {_.map(this.state.decks, this.getDeck)}
          </div>
        </div>
      );
    }

    return (
      <div className="no-decks">
        <h1>You have not created any decks yet</h1>

        <Link to="/decks/create">
          <button className="button">
            <i className="fa fa-plus"></i>
            Create your first deck now!
          </button>
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div className="home">
        {this.getContent()}
      </div>
    );
  }
}

export default Home;
