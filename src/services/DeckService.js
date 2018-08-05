import { toast } from 'react-toastify';
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

  async create(data, uid) {
    const route = routes.Decks.create;

    try {
      const response = await super.post(route, {
        uid,
        ...data,
      });

      return response;
    } catch (ex) {
      return toast.error(ex.response.data);
    }
  }
}

export default new DeckService();
