const express = require('express');
const auth = require('../auth');
const Producers = require('../models/producers');

const producers = express.Router()
producers.get('/', async (req, res) => {
    try{
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const offset  = (page - 1) * limit;
        const result = await Producers.allProducers(offset, limit)
        res.json(result)
    }catch(err){
        console.error(err)
        res.status(400).send(err)
    }
})
producers.get('/:name', async (req, res)=>{
    try{
        const result = await Producers.getProducer(req.params.name);
        res.json(result)
    }catch(err){
        console.error(err)
        res.status(400).send(err)
    }
})
producers.post('/', auth, async (req, res)=>{
    try{
        const result = await Producers.create(req.body);
        res.json(result)
    }catch(err){
        console.error(err)
        res.status(400).send(err)
    }
})
producers.delete('/:id', auth, async (req, res)=>{
    try{
        const result = await Producers.removeProducer(req.params.id);
        res.json(result);
    }catch(err){
        console.error(err)
        res.status(400).send(err)
    }
})
producers.put('/', auth, async (req, res)=>{
    try{
        const result = await Producers.updateProducer(req.body);
        res.json(result)
    }catch(err){
        console.error(err)
        res.status(400).send(err)
    }
})
module.exports = producers;