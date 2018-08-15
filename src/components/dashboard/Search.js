import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { RingLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import uuid from 'uuid/v4';
import Tile from '../cards/Tile';
import CardService from '../../services/CardService';
import SearchBar from '../HeaderSearch';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      searchValue: props.searchValue || '',
      loading: true,
    };

    this.getCard = this.getCard.bind(this);
    this.onChange = this.onChange.bind(this);
    this.searchWrapper = this.searchWrapper.bind(this);
    this.search = this.search.bind(this);
  }

  static getDerivedStateFromProps(props) {
    return {
      searchValue: props.searchValue,
    };
  }

  componentDidMount() {
    this.getCards();
  }

  componentDidUpdate(prevState) {
    if (this.state.searchValue !== prevState.searchValue) {
      this.getCards();
    }
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


    if (this.state.searchValue && this.state.searchValue !== '') {
      return this.search();
    }

    const cards = await CardService.random();

    return this.setState({
      cards,
      loading: false,
    });
  }

  searchWrapper(e) {
    if (e && e.type !== 'click' && e.key !== 'Enter') {
      return false;
    }

    return this.search();
  }

  async search() {
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
    return <Tile key={uuid()} card={card} draggable clickable={this.props.clickable} />;
  }

  getCardContent() {
    if (this.state.loading) {
      return (
        <div className="cards-loader">
          <RingLoader
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
        <SearchBar></SearchBar>

        {/* <div className="search-stuff">
          <label htmlFor="searchValue">
            Search for a card:

            <input
              autoFocus
              name="searchValue"
              type="text"
              placeholder="Search for a card"
              value={this.state.searchValue}
              onChange={this.onChange}
              onKeyDown={this.searchWrapper}
            />
          </label>

          <button className="button primary" onClick={this.searchWrapper}>
            <i className="fa fa-search"></i>
            Search
          </button>
        </div> */}

        <div className="cards">
          {this.getCardContent()}
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  searchValue: PropTypes.string,
  clickable: PropTypes.bool,
};

Search.defaultProps = {
  searchValue: '',
};

const mapStateToProps = state => ({
  searchValue: state.searchValue,
});

export default connect(
  mapStateToProps,
)(Search);
