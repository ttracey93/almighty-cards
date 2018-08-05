import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CardService from '../../services/CardService';

class Card extends Component {
  constructor(props) {
    super(props);

    const imageUrl = `http://localhost:3001/images/${props.match.params.id}.jpg`;

    this.state = {
      imageUrl,
      card: {
        id: props.match.params.id,
      },
    };
  }

  async componentDidMount() {
    const cards = await CardService.get(this.props.match.params.id);
    this.setState({
      card: cards[0],
    });
  }

  render() {
    return (
      <div className="card-view-container">
        <Link to="/">
          <button className="button">
            <i className="fa fa-arrow-left"></i>
            Go Back
          </button>
        </Link>

        <div className="card-view">
          <img
            src={this.state.imageUrl}
            alt={this.state.card.name}
          />

          <div className="card-info">
            <label>
              Name:
              <span>
                {this.state.card.name}
              </span>
            </label>

            <label>
              Description:
              <span>
                {this.state.card.description}
              </span>
            </label>

            <label>
              Attack:
              <span>
                {this.state.card.atk}
              </span>
            </label>

            <label>
              Defense:
              <span>
                {this.state.card.def}
              </span>
            </label>

            <label>
              Attribute:
              <span>
                {this.state.card.attribute}
              </span>
            </label>

            <label>
              Type:
              <span>
                {this.state.card.type}
              </span>
            </label>

            <label>
              Race:
              <span>
                {this.state.card.race}
              </span>
            </label>
          </div>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Card;
