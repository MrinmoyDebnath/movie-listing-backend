const express = require('express')
const Actors = require('../models/actors');

const actors = express.Router()
actors.get('/', async (req, res) => {
    try{
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const offset  = (page - 1) * limit;
        // const endIndex = page * limit;
        const actors = await Actors.allActors(offset, limit);
        // const result = actors.slice(startIndex, endIndex);
        res.json(actors)
    }catch(err){
        console.error(err)
    }
})
actors.get('/:name', async (req, res)=>{
    try{
        console.log(req.params.name)
        const result = await Actors.getActor(req.params.name);
        res.json(result)
    }catch(err){
        console.error(err)
    }
})
actors.post('/', async (req, res)=>{
    try{
        const result = await Actors.create(req.body);
        res.json(result)
    }catch(err){
        console.error(err)
    }
})
actors.delete('/:id', async (req, res)=>{
    try{
        const result = await Actors.removeActor(req.params.id);
        res.json(result);
    }catch(err){
        console.error(err)
    }
})
actors.put('/', async (req, res)=>{
    try{
        const result = await Actors.updateActor(req.body);
        res.json(result)
    }catch(err){
        console.error(err)
    }
})
module.exports = actors;