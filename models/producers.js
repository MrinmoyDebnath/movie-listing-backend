const db = require('../db.js');
const { v4: uuidv4 } = require('uuid');
const atob = require('atob');

async function create(data) {
    try{
        const result = await db.query(
            `INSERT INTO producer (id,
                                name,
                                sex,
                                dob,
                                bio)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING * ;`,
            [
                uuidv4(),
                atob(data.name),
                atob(data.sex),
                atob(data.dob),
                atob(data.bio) || null,
            ]);
        const res = {};
        res.results = result.rows[0];
        return res;
    }catch(err){
        throw err
    }
}

async function allProducers(offset, limit) {
    try{
        const result = await db.query(
                `SELECT * FROM producer OFFSET $1 LIMIT $2;`,
                [offset, limit]
            );
        const res = {};
        if(result.rows.length > 0)
        res.next = {
            page: offset + 2,
            limit
        }
        if(offset>=1)
        res.previous = {
            page: offset,
            limit
        }
        res.results = result.rows;
        return res;
    }catch(err){
        throw err
    }
}
async function getProducer(name) {
    try{
        const result = await db.query(
                `SELECT * FROM producer WHERE name ILIKE $1;`,
                ['%'+name+'%']
            );
        const res = {};
        res.results = result.rows;
        return res;
    }catch(err){
        throw err
    }
}
async function updateProducer(data) {
    try{
        let producer = []
        if(data.name){
            const res = await db.query(
                `UPDATE producer SET name = $1 where id = $2 RETURNING *;`,
                [
                    data.name,
                    data.id
                ]
            )
            producer = res.rows[0]
        }
        if(data.sex){
            const res = await db.query(
                `UPDATE producer SET sex = $1 where id = $2 RETURNING *;`,
                [
                    data.sex,
                    data.id
                ]
            )
            producer = res.rows[0]
        }
        if(data.dob){
            const res = await db.query(
                `UPDATE producer SET dob = $1 where id = $2 RETURNING *;`,
                [
                    data.dob,
                    data.id
                ]
            )
            producer = res.rows[0]
        }
        if(data.bio){
            const res = await db.query(
                `UPDATE producer SET bio = $1 where id = $2 RETURNING *;`,
                [
                    data.bio,
                    data.id
                ]
            )
            producer = res.rows[0]
        }
        const res = {};
        res.results = producer;
        return res;
    }catch(err){
        throw err
    }
}
async function removeProducer(id) {
    try{
        const result = await db.query(
                `DELETE FROM producer where id = $1;`,
                [id]
            );
        const res = {};
        res.results = result.rows;
        return res;
    }catch(err){
        throw err
    }
}
const Producers = {
    create,
    allProducers,
    updateProducer,
    getProducer,
    removeProducer
}
module.exports = Producers;