const express = require('express')
const Users = require('../models/users');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const bcrypt = require('bcrypt');

const users = express.Router()

users.post('/signup', async (req, res)=>{
    try{
        if(req.body.username && req.body.email && req.body.password){
            const secretSalt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(req.body.password, secretSalt);
            const data = {...req.body, password: hashedPassword};
            const result = await Users.create(data);
            res.status(200).json(result)
        }else{
            res.status(400).send('missing fields')
        }
    }catch(err){
        console.error(err)
        res.status(400).send(err)
    }
})
users.post('/login', async (req, res)=>{
    try{
        if(req.body.username && req.body.email && req.body.password){
            const user = await Users.getUser(req.body);
            if(user.results){
                const correctPassword = await bcrypt.compare(req.body.password, user.results.password)
                if(correctPassword){
                    console.log('here')
                    jwt.sign(req.body, SECRET_KEY, async (err, token)=>{
                        if(err){
                            res.status(404).send(err);
                        }else{
                            res.status(200).json({...user.results, token})
                        }
                    })
                }else{
                    res.status(400).send('Wrong password');
                }
            }else{
                res.status(400).send('No such user')
            }
        }
    }catch(err){
        console.error(err)
        res.status(400).send(err)
    }
})
module.exports = users;