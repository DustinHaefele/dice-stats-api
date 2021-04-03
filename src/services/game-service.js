
const GameService = {
  addGameToTable(db, game) {
    const isValid = this.validateGame(game);
    if(isValid){
      console.log(game);
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
  }

};

module.exports = GameService;