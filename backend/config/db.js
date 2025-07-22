const { Pool } = require('pg');
require('dotenv').config();


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  }
});

pool
    .connect()
    .then(()=> {
        console.log('connected to postgreSQL');
    })
    .catch((err) => {
        console.error('Failed to connect to DB:',err);
    });

module.exports = pool;