const { count } = require('console');
const express = require('express');
const path = require('path');
const GameRouter = express.Router();
const GameService = require('../services/game-service');
const PlayerService = require('../services/player-service');
const jsonBodyParser = express.json();

GameRouter.post('/', jsonBodyParser, (req, res) => {
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

module.exports = GameRouter;
