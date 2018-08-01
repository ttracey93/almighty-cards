import Service from './Service';
import routes from './routes';

class CardService extends Service {
  async get(id) {
    const route = `${routes.Cards.get}/${id}`;
    const response = await super.get(route);
    return response.data;
  }

  async random() {
    const response = await super.get(routes.Cards.random);
    return response.data;
  }

  async search(value) {
    const response = await super.post(routes.Cards.search, {
      q: value,
    });

    return response.data;
  }
}

export default new CardService();
