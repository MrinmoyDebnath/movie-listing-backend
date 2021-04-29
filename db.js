const { Pool } = require('pg');

const USER = process.env.USER;
const HOST = process.env.HOST;
const DATABASE = process.env.DATABASE;
const PORT = process.env.PORT;
const PASSWORD = process.env.PASSWORD;

const db = new Pool({
    user: USER,
    host: HOST,
    database: DATABASE,
    password: PASSWORD,
    port: PORT,
    max: 20,
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 0
})
db.connect();

module.exports = db;