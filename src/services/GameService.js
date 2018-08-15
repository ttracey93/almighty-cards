import Service from './Service';
import routes from './routes';

class GameService extends Service {
  async getGameTypes() {
    const response = await super.get(routes.Games.types);
    return response.data;
  }

  async getGames() {
    const response = await super.get(routes.Games.get);
    return response.data;
  }
}

export default new GameService();
