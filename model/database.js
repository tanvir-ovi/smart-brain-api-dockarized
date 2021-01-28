const knex = require('knex');

//database connections
const db = knex({
  client: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
}); 

module.exports = {
  db
}