const express = require('express');
const Producers = require('../models/producers');

const producers = express.Router()
producers.get('/', async (req, res) => {
    try{
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const offset  = (page - 1) * limit;
        const result = await Producers.allProducers(offset, limit)
        return res.json(result)
    }catch(err){
        return res.status(400).send('Something went wrong')
    }
})
producers.get('/:name', async (req, res)=>{
    try{
        const result = await Producers.getProducer(req.params.name);
        return res.json(result)
    }catch(err){
        return res.status(400).send('Something went wrong')
    }
})
producers.post('/', async (req, res)=>{
    try{
        const result = await Producers.create(req.body);
        return res.json(result)
    }catch(err){
        return res.status(400).send('Something went wrong')
    }
})
producers.delete('/:id', async (req, res)=>{
    try{
        const result = await Producers.removeProducer(req.params.id);
        return res.json(result);
    }catch(err){
        return res.status(400).send('Something went wrong')
    }
})
producers.put('/', async (req, res)=>{
    try{
        const result = await Producers.updateProducer(req.body);
        return res.json(result)
    }catch(err){
        return res.status(400).send('Something went wrong')
    }
})
module.exports = producers;