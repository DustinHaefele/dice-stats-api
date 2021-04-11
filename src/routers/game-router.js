const express = require('express');
const GameRouter = express.Router();
const {postGameStats, getGameStats} = require('../services/game-service');
const jsonBodyParser = express.json();

GameRouter.post('/', jsonBodyParser, postGameStats);

GameRouter.get('/stats', getGameStats);

module.exports = GameRouter;
