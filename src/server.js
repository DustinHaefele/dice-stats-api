const app = require('./app');
const {PORT, DATABASE_URL} = require('./config');
const knex = require('knex');
const parse = require(DATABASE_URL).parse;
const pgconfig = parse(DATABASE_URL);
pgconfig.ssl = { rejectUnauthorized: false };

const db = knex({
  client: 'pg',
  connection: pgconfig
});

app.set('db',db);

app.listen(PORT, ()=>{
  console.log(`Server is listening at PORT ${PORT}`);
});