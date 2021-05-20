const express = require('express');
const PlayersRouter = express.Router();
const jsonBodyParser = express.json();
const { getPlayerStats, addPlayer } = require('../services/player-service');

PlayersRouter.get('/', getPlayerStats);

PlayersRouter.post('/', jsonBodyParser, addPlayer);

module.exports = PlayersRouter;
