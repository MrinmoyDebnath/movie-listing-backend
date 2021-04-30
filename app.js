const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()

const SERVER_PORT = process.env.SERVER_PORT;
const HOST = process.env.HOST;

const actors = require('./routes/actors');
const producers = require('./routes/producers');
const movies = require('./routes/movies');
const users = require('./routes/users');
const {authenticate} = require('./auth');

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.use('/actors', authenticate, actors);
app.use('/producers', authenticate, producers);
app.use('/movies', authenticate, movies);
app.use('/user', users)
app.use((req, res)=>{
    res.status(400).send({
        error: "Page Not Found"
    })
})

const port = SERVER_PORT || 3001;
app.listen(port, ()=>{
    console.log(`listening on http://${HOST}:${port}`);
})
