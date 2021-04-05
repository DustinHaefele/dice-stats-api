const app = require('./app');
const {PORT, DATABASE_URL} = require('./config');
const knex = require('knex');
const utils = require('./utils');

const connectionConfig = utils.parsePostgresHost(DATABASE_URL);

const db = knex({
  client: 'pg',
  connection: connectionConfig
});

app.set('db',db);

app.listen(PORT, ()=>{
  console.log(`Server is listening at PORT ${PORT}`);
});