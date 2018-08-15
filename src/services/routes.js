export default {
  Games: {
    get: 'games',
    types: 'games/types',
  },
  Cards: {
    get: 'cards',
    random: 'cards/random',
    search: 'cards/search',
  },
  Decks: {
    get: 'decks',
    getAllForUser: 'decks/user',
    create: 'decks',
    addCard: 'decks/add',
    removeCard: 'decks/remove',
    getCards: 'decks/cards',
  },
};
