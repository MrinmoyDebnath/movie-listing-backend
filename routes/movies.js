const express = require('express')
const Movies = require('../models/movies')

const movies = express.Router()
movies.get('/', async (req, res) => {
    try{
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const offset  = (page - 1) * limit;
        const result = await Movies.allMovies(offset, limit)
        res.json(result)
    }catch(err){
        console.error(err)
    }
})
movies.get('/:name', async (req, res)=>{
    try{
        const result = await Movies.getMovieFromName(req.params.name);
        res.json(result)
    }catch(err){
        console.error(err)
    }
})
movies.get('/actor/:name', async (req, res)=>{
    try{
        const result = await Movies.getMovieOfActor(req.params.name);
        res.json(result)
    }catch(err){
        console.error(err)
    }
})
movies.get('/producer/:name', async (req, res)=>{
    try{
        const result = await Movies.getMovieOfProducer(req.params.name);
        res.json(result)
    }catch(err){
        console.error(err)
    }
})
movies.post('/', async (req, res)=>{
    try{
        const result = await Movies.create(req.body);
        res.json(result)
    }catch(err){
        console.error(err)
    }
})
movies.delete('/:id', async (req, res)=>{
    try{
        const result = await Movies.removeMovie(req.params.id);
        res.json(result);
    }catch(err){
        console.error(err)
    }
})
movies.put('/', async (req, res)=>{
    try{
        console.log(req.body)
        const result = await Movies.updateMovies(req.body);
        res.json(result)
    }catch(err){
        console.error(err)
    }
})
module.exports = movies;