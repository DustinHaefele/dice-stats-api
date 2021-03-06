require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const GameRouter = require('./routers/game-router.js');

const app = express();

const morganOption = (NODE_ENV === 'production') ? 'common' : 'dev';

app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());

app.use('/api/game', GameRouter);

app.get('/', (req, res) => {
  res.send(true);
});


app.use(function errorHandler(error, req, res, next){
  let response;
  if (NODE_ENV === 'production'){
    response = {error: {message: 'server error'}};
  } else {
    console.log(error);
    response = {message: error.message, error};
  }
  res.status(500).json(response);
});

module.exports = app;
