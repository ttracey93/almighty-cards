import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { PacmanLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import Tile from '../cards/Tile';
import CardService from '../../services/CardService';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      searchValue: '',
      loading: true,
    };

    this.onChange = this.onChange.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    this.getCards();
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  async getCards() {
    this.setState({
      loading: true,
    });

    const cards = await CardService.random();

    this.setState({
      cards,
      loading: false,
    });
  }

  async search(e) {
    if (e && e.type !== 'click' && e.key !== 'Enter') {
      return false;
    }

    this.setState({
      loading: true,
    });

    const cards = await CardService.search(this.state.searchValue);

    if (!cards || cards.length === 0) {
      toast.error('No cards found!');
    }

    return this.setState({
      cards,
      loading: false,
    });
  }

  getCard(card) {
    return <Tile key={card.id} card={card} />;
  }

  getCardContent() {
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

    return _.map(this.state.cards, this.getCard);
  }

  render() {
    return (
      <div className="flex columns search">
        <div className="search-stuff">
          <label htmlFor="searchValue">
            Search for a card:

            <input
              autoFocus
              name="searchValue"
              type="text"
              placeholder="Search for a card"
              value={this.state.searchValue}
              onChange={this.onChange}
              onKeyDown={this.search}
            />
          </label>

          <button className="button primary" onClick={this.search}>
            <i className="fa fa-search"></i>
            Search
          </button>
        </div>

        <div className="cards">
          {this.getCardContent()}
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
)(Search);
