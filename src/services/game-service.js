const PlayerService = require('./player-service');
  
  async function addGameToTable(db, game) {
    const isValid = validateGame(game);
    if(isValid){
      const games = await db('games').insert(game).returning('*');
      return games[0];
    }
    return false;
  };
  async function postGameStats(req, res) {
  try{
    const {countMap, winner, losers} = req.body;
  
    const db = req.app.get('db');
    const user = await PlayerService.findByUserName(db, winner)
  
      if(!user) {
        return res.status(400).json('no user found');
      }
      countMap.winner = user.id;
  
      await PlayerService.addWinToPlayer(db, user)
      losers.forEach(async (loserName) => {
        const loser = await PlayerService.findByUserName(db, loserName);
        await PlayerService.addLossToPlayer(db, loser);
      })
      const game = await addGameToTable(db, countMap)
      return res.json(game);
  } catch(e) {
      res.status(500).send(e);
  }
};
  function validateGame(game) {
    const keys = Object.keys(game);
    const expectedKeys = ['two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'winner'];
    let isValid = true;
    expectedKeys.forEach(key => {
      if(!keys.includes(key)) {
        isValid = false;
      }
    });
    return isValid;
  };
  async function getAllGames(db){
    return db('games').select('*');
  };
  function createGameObject() {
    return {two: 0, three:0, four:0, five:0, six:0, seven:0, eight:0, nine:0, ten:0, eleven:0, twelve:0};
  };

  async function getGameStats(req,res, next) {
    try {
      const games = await getAllGames(req.app.get('db'));
      const rollTotals = createGameObject();
      const rollKeys = Object.keys(rollTotals);
      let overallTotal=0;
      let gameCount=0;
      games.forEach(game=>{
        gameCount++;
        rollKeys.forEach(key=>{
          rollTotals[key] += game[key];
          overallTotal += game[key];
        });
      });
      const gameStats = createGameObject();
      rollKeys.forEach(key => {
        gameStats[key] = rollTotals[key] / overallTotal;
      });
      return res.json({rollTotals, gameStats, overallTotal, gameCount});
  } catch(e) {
      res.status(500).send(e);
  }
}


module.exports = {addGameToTable, createGameObject, getAllGames, validateGame, postGameStats, getGameStats};