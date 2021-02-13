const knex = require('knex');

//database connections
const db = require('knex')({
  client: 'pg',
  connection: process.env.POSTGRES_URI
});

module.exports = {
  db
}