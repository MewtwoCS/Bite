const { Pool } = require('pg');
require('dotenv').config();

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = `${process.env.PG_URI}`;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({
  connectionString: URI,
});

// query to create user table
// CREATE TABLE user (
//   user_id serial PRIMARY KEY,
//   username VARCHAR, NOT NULL,
//   passsword VARCHAR, NOT NULL
// );

// query to add participants
//  INSERT INTO user (user_id, participantID, historyId)
//  VALUES (value1, value2, ...)
//  RETURNING *;

// query to return history table
//  INSERT INTO history (hostId, participantsId)
//  VALUES (value1, value2, ...)
//  RETURNING *;

console.log('connected to database');

module.exports = {
  query: (text, params, callback) => {
    console.log('Query made', text);
    return pool.query(text, params, callback);
  },
}; // <-- export your model
