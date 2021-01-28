const knex = require('knex');

//database connections
const db = knex({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
}); 

module.exports = {
  db
}