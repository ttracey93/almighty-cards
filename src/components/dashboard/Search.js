import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { PacmanLoader } from 'react-spinners';
import { toastr } from 'react-toastify';
import { Cards } from '../../firebase';
import Tile from '../cards/Tile';

const QUERY_LIMIT = 25;

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

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  async getCards(query) {
    this.setState({
      loading: true,
    });

    const cards = await query.get();

    if (cards && cards.docs) {
      this.setState({
        cards: cards.docs,
        loading: false,
      });
    } else {
      toastr.error('Server Error: Could not load cards');
    }
  }

  search(e) {
    if (e && e.type !== 'click' && e.key !== 'Enter') {
      return false;
    }

    const searchValue = this.state.searchValue.toLowerCase();

    const query = Cards.limit(QUERY_LIMIT)
      .where('searchName', '>=', searchValue)
      .where('searchName', '<', `${searchValue}a`);
    return this.getCards(query);
  }

  componentDidMount() {
    this.getCards(Cards.limit(QUERY_LIMIT));
  }

  getCard(card) {
    const data = card.data();
    return <Tile key={data.id} card={data} />;
  }

  getCardContent() {
    if (this.state.loading) {
      return (
        <div className="cards-loader">
          <PacmanLoader
            className="cards-loader"
            color="white"
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
        <div className="flex search-stuff">
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
