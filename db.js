const { Client } = require('pg');
const { USER, HOST, DATABASE, PASSWORD, PORT } = require('./config');

const db = new Client({
    user: USER,
    host: HOST,
    database: DATABASE,
    password: PASSWORD,
    port: PORT,
})
db.connect();

module.exports = db;