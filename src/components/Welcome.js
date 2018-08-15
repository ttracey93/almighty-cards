import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import GameService from '../services/GameService';

class Welcome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameTypes: [],
      games: {},
    };

    this.getGame = this.getGame.bind(this);
    this.getGameType = this.getGameType.bind(this);
  }

  async componentDidMount() {
    const gameTypes = await GameService.getGameTypes();
    const games = await GameService.getGames();

    console.log(gameTypes);
    console.log(games);

    this.setState({
      gameTypes,
      games,
    });
  }

  getGameType(gameType) {
    const relevantGames = _.filter(this.state.games, game => game.type === gameType.id);

    return (
      <div className="game-type-row">
        <div className="game-type-cell">
          {gameType.name}
        </div>

          <div className="game-type-games">
            <Link to="/search">
              {_.map(relevantGames, this.getGame)}
            </Link>
          </div>
      </div>
    );
  }

  getGame(game) {
    return (
      <div className="game-cell">
        {game.name}
      </div>
    );
  }

  render() {
    return (
      <div className="flex columns welcome">
        <span className="header">
          Welcome to Almighty Games and More!
        </span>

        <div className="games-grid">
          {_.map(this.state.gameTypes, this.getGameType)}
        </div>
      </div>
    );
  }
}

export default Welcome;
