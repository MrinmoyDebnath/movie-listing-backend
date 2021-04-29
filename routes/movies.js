const express = require('express');
const Movies = require('../models/movies')

const movies = express.Router()
movies.get('/', async (req, res) => {
    try{
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const offset  = (page - 1) * limit;
        const result = await Movies.allMovies(offset, limit)
        return res.json(result)
    }catch(err){
        return res.status(400).send('Something went wrong')
    }
})
movies.get('/:name', async (req, res)=>{
    try{
        const result = await Movies.getMovieFromName(req.params.name);
        return res.json(result)
    }catch(err){
        return res.status(400).send('Something went wrong')
    }
})
movies.get('/actor/:name', async (req, res)=>{
    try{
        const result = await Movies.getMovieOfActor(req.params.name);
        return res.json(result)
    }catch(err){
        return res.status(400).send('Something went wrong')
    }
})
movies.get('/producer/:name', async (req, res)=>{
    try{
        const result = await Movies.getMovieOfProducer(req.params.name);
        return res.json(result)
    }catch(err){
        return res.status(400).send('Something went wrong')
    }
})
movies.post('/', async (req, res)=>{
    try{
        const result = await Movies.create(req.body);
        return res.json(result)
    }catch(err){
        return res.status(400).send('Something went wrong')
    }
})
movies.delete('/:id', async (req, res)=>{
    try{
        const result = await Movies.removeMovie(req.params.id);
        return res.json(result);
    }catch(err){
        return res.status(400).send('Something went wrong')
    }
})
movies.put('/', async (req, res)=>{
    try{
        const result = await Movies.updateMovies(req.body);
        res.json(result)
    }catch(err){
        res.status(400).send('Something went wrong')
    }
})
module.exports = movies;