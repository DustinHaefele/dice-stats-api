
const GameService = {
  addGameToTable(db, game) {
    const isValid = this.validateGame(game);
    if(isValid){
      return db('games').insert(game).returning('*').then(games=>games[0]);
    }
    return false;
  },
  validateGame(game) {
    const keys = Object.keys(game);
    const expectedKeys = ['two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'winner'];
    let isValid = true;
    expectedKeys.forEach(key => {
      if(!keys.includes(key)) {
        isValid = false;
      }
    });
    return isValid;
  },
  getAllGames(db){
    return db('games').select('*');
  }, 
  createGameObject() {
    return {two: 0, three:0, four:0, five:0, six:0, seven:0, eight:0, nine:0, ten:0, eleven:0, twelve:0};
  }
};

module.exports = GameService;