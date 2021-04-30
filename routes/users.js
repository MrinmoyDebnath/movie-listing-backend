const express = require('express');
const bcrypt = require('bcrypt');
const atob = require('atob');
const Users = require('../models/users');
const { generateAccessToken, generateRefreshToken, tokenRefresh } = require('../auth');

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
users.post('/refresh-token', async (req, res)=>{
    try{
        const refreshToken = req.body.token;
        if (refreshToken === null) return res.sendStatus(401);
        tokenRefresh(req.body, res);
    }catch(err){
        return res.status(400).send(err)
    }
})
users.post('/login', async (req, res)=>{
    try{
        if(req.body.username && req.body.password){
            const user = await Users.getUser(req.body);
            if(user.results){
                const correctPassword = await bcrypt.compare(atob(req.body.password), user.results.password)
                if(correctPassword){
                    const accessToken = generateAccessToken(req.body);
                    const refreshToken = generateRefreshToken(req.body);
                    return res.status(200).json({...user.results, 'token': accessToken, 'refreshToken': refreshToken})
                }else{
                    return res.status(403).send('Wrong password');
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