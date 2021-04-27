const db = require('../db.js');
const { v4: uuidv4 } = require('uuid');

async function create(data) {
    try{
        const result = await db.query(
            `INSERT INTO users (id,
                                username,
                                email,
                                password)
                VALUES ($1, $2, $3, $4)
                RETURNING * ;`,
            [
                uuidv4(),
                data.username,
                data.email,
                data.password
            ]);
        const res = {};
        res.results = result.rows[0];
        return res;
    }catch(err){
        console.error(err)
        throw err
    }
}

async function getUser(data){
    try{
        const result = await db.query(
            `SELECT * FROM users
             WHERE username = $1 ;
            `,
            [
                data.username
            ]
        );
        const res = {};
        res.results = result.rows[0];
        return res;
    }catch(err){
        console.error(err);
        throw err;
    }
}

const Users = {
    create,
    getUser
}
module.exports = Users;