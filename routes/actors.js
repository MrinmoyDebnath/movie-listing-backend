const express = require('express')
const Actors = require('../models/actors');

const actors = express.Router()
actors.get('/', async (req, res) => {
    try{
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const offset  = (page - 1) * limit;
        const actors = await Actors.allActors(offset, limit);
        return res.json(actors)
    }catch(err){
        return res.status(400).send('Something went wrong')
    }
})
actors.get('/:name', async (req, res)=>{
    try{
        const result = await Actors.getActor(req.params.name);
        return res.json(result)
    }catch(err){
        return res.status(400).send('Something went wrong')
    }
})
actors.post('/', async (req, res)=>{
    try{
        const result = await Actors.create(req.body);
        return res.json(result)
    }catch(err){
        return res.status(400).send('Something went wrong')
    }
})
actors.delete('/:id',  async (req, res)=>{
    try{
        const result = await Actors.removeActor(req.params.id);
        return res.json(result);
    }catch(err){
        return res.status(400).send('Something went wrong')
    }
})
actors.put('/', async (req, res)=>{
    try{
        const result = await Actors.updateActor(req.body);
        return res.json(result)
    }catch(err){
        return res.status(400).send('Something went wrong')
    }
})
module.exports = actors;