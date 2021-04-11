const express = require('express');
const PlayersRouter = express.Router();
const { getPlayerStats } = require('../services/player-service');

PlayersRouter.get('/', getPlayerStats);

module.exports = PlayersRouter;
