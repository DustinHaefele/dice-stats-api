const app = require('./app');
const {PORT, DATABASE_URL} = require('./config');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host: 'ec2-54-196-33-23.compute-1.amazonaws.com',
    port: 5432,
    username: 'jzedhnujsodgbh',
    database: 'dfo09pjethtvv7',
    ssl: { rejectUnauthorized: false },
    password: 'f13d0ab6dae055f57563f53743bcc2a7d85e612705b6253611d5fcf98e2fbc5f'
  }
});

app.set('db',db);

app.listen(PORT, ()=>{
  console.log(`Server is listening at PORT ${PORT}`);
});