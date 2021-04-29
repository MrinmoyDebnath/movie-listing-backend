const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()

const SERVER_PORT = process.env.SERVER_PORT;

const actors = require('./routes/actors');
const producers = require('./routes/producers');
const movies = require('./routes/movies');
const users = require('./routes/users');
const auth = require('./auth');

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.use('/actors', auth, actors);
app.use('/producers', auth, producers);
app.use('/movies', auth, movies);
app.use('/user', users)
app.use((req, res, next)=>{
    res.status(400).send({
        error: "Not Found"
    })
})

const port = SERVER_PORT || 3001;
app.listen(port, ()=>{
    console.log(`listening on http://localhost:${port}`);
})
