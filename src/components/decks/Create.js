import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import DeckService from '../../services/DeckService';

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
    };

    this.onChange = this.onChange.bind(this);
    this.createDeck = this.createDeck.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  async createDeck(e) {
    e.preventDefault();

    if (!this.state.name || this.state.name === '' || !this.state.description || this.state.description === '') {
      return toast.error('Please enter valid info');
    }

    try {
      const response = await DeckService.create({
        name: this.state.name,
        description: this.state.description,
      }, this.props.user.uid);

      if (response.status === 200 || response.status === 201) {
        toast.success('Your deck has been created!');
        this.props.history.push('/dashboard');
      }
    } catch (ex) {
      toast.error('Hmm...something didn\'t go quite right');
    }

    return false;
  }

  render() {
    return (
      <div className="create-deck">
        <h1>Create Your Deck</h1>

        <form onSubmit={this.createDeck}>
          <label>
            Name:
            <input name="name" onChange={this.onChange} type="text" placeholder="Deck Name" />
          </label>

          <label>
            Description:
            <textarea name="description" onChange={this.onChange} placeholder="Description..."></textarea>
          </label>

          <button type="submit" className="button">
            Create Deck!
          </button>
        </form>
      </div>
    );
  }
}

Create.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Create;
