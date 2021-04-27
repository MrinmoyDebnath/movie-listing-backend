const express = require('express')
const Actors = require('../models/actors');
const auth = require('../auth');

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
        res.status(400).send(err)
    }
})
actors.get('/:name', async (req, res)=>{
    try{
        console.log(req.params.name)
        const result = await Actors.getActor(req.params.name);
        res.json(result)
    }catch(err){
        console.error(err)
        res.status(400).send(err)
    }
})
actors.post('/', auth, async (req, res)=>{
    console.log('body: ', req.body)
    try{
        const result = await Actors.create(req.body);
        res.json(result)
    }catch(err){
        console.error(err)
        res.status(400).send(err)
    }
})
actors.delete('/:id', auth,  async (req, res)=>{
    try{
        const result = await Actors.removeActor(req.params.id);
        res.json(result);
    }catch(err){
        console.error(err)
        res.status(400).send(err)
    }
})
actors.put('/', auth, async (req, res)=>{
    try{
        const result = await Actors.updateActor(req.body);
        res.json(result)
    }catch(err){
        console.error(err)
        res.status(400).send(err)
    }
})
module.exports = actors;