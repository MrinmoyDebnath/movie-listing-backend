const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { SERVER_PORT } = require('./config');
const actors = require('./routes/actors');
const producers = require('./routes/producers');
const movies = require('./routes/movies');
const users = require('./routes/users');

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.use('/actors', actors);
app.use('/producers', producers);
app.use('/movies', movies);
app.use('/user', users)

const port = SERVER_PORT || 3001;
app.listen(port, ()=>{
    console.log(`listening on http://localhost:${port}`);
})
