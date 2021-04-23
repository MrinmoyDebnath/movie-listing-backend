const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const actors = require('./routes/actors');
const producers = require('./routes/producers');
const movies = require('./routes/movies');

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.use('/actors', actors);
app.use('/producers', producers);
app.use('/movies', movies);

app.listen(3000, ()=>{
    console.log('listening on http://localhost:3000');
})
