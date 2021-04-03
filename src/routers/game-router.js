const express = require('express');
const GameRouter = express.Router();
const GameService = require('../services/game-service');
const PlayerService = require('../services/player-service');
const jsonBodyParser = express.json();

GameRouter.post('/', jsonBodyParser, (req, res, next) => {
  const {countMap, winner} = req.body;

  return PlayerService.findByUserName(req.app.get('db'), winner).then(user =>{

    if(!user) {
      return res.status(400).json('no user found');
    }
    countMap.winner = user.id;

    return GameService.addGameToTable(req.app.get('db'), countMap).then(()=>{
      return res.json(true);
    });
  });
});

GameRouter.get('/stats', (req, res, next)=> {
  return GameService.getAllGames(req.app.get('db')).then(games=>{
    const rollTotals = GameService.createGameObject();
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
    const gameStats = GameService.createGameObject();
    rollKeys.forEach(key => {
      gameStats[key] = rollTotals[key] / overallTotal;
    });
    return res.json({rollTotals, gameStats, overallTotal, gameCount});
  });
});

module.exports = GameRouter;
