import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/header';

class HeaderSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
    };

    this.onChange = this.onChange.bind(this);
    this.search = this.search.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  search(e) {
    if (e && e.type !== 'click' && e.key !== 'Enter') {
      return false;
    }

    return this.props.search(this.state.searchValue);
  }

  render() {
    return (
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
    );
  }
}

HeaderSearch.propTypes = {
  search: PropTypes.func.isRequired,
};

export default connect(null, actions)(HeaderSearch);
