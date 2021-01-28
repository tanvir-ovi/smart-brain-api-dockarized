const knex = require('knex');

//database connections
const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'khankirpola06',
    database: 'smartBrainDB'
  }
}); 

module.exports = {
  db
}