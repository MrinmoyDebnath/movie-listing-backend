
require('dotenv').config()

const USER = process.env.USER;
const HOST = process.env.HOST;
const DATABASE = process.env.DATABASE;
const PORT = process.env.PORT;
const SERVER_PORT = process.env.SERVER_PORT;
const PASSWORD = process.env.PASSWORD;
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = {
    USER,
    HOST,
    DATABASE,
    PORT,
    SERVER_PORT,
    PASSWORD,
    SECRET_KEY,
}