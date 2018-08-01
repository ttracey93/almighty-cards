import Service from './Service';
import routes from './routes';

class DeckService extends Service {
  async get(id) {
    const route = `${routes.Decks.get}/${id}`;
    const response = await super.get(route);
    return response.data;
  }

  async getAllForUser(uid) {
    const route = `${routes.Decks.getAllForUser}/${uid}`;
    const response = await super.get(route);

    return response.data;
  }
}

export default new DeckService();
