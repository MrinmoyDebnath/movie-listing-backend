const express = require('express')
const Users = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const atob = require('atob');

const SECRET_KEY = process.env.SECRET_KEY;

const users = express.Router()

users.post('/signup', async (req, res)=>{
    try{
        if(req.body.username && req.body.email && req.body.password){
            const saltRounds = 12;
            const secretSalt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(atob(req.body.password), secretSalt);
            const data = {...req.body, password: hashedPassword};
            const result = await Users.create(data);
            return res.status(200).json(result)
        }else{
            return res.status(400).send('missing fields')
        }
    }catch(err){
        return res.status(400).send('Something went wrong')
    }
})
users.post('/login', async (req, res)=>{
    try{
        if(req.body.username && req.body.password){
            const user = await Users.getUser(req.body);
            if(user.results){
                const correctPassword = await bcrypt.compare(atob(req.body.password), user.results.password)
                if(correctPassword){
                    jwt.sign(req.body, SECRET_KEY, async (err, token)=>{
                        if(err){
                            return res.status(400).send('Wrong Password');
                        }else{
                            return res.status(200).json({...user.results, token})
                        }
                    })
                }else{
                    return res.status(400).send('Wrong password');
                }
            }else{
                return res.status(400).send('No such user');
            }
        }else{
            return res.status(400).send('Fill the fields');
        }
    }catch(err){
        return res.status(400).send('Wrong request')
    }
})
module.exports = users;