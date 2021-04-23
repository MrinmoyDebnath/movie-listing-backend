const db = require('../db.js');
const { v4: uuidv4 } = require('uuid');

async function create(data) {
    const result = await db.query(
        `INSERT INTO actors (id,
                            name,
                            sex,
                            dob,
                            bio)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
        [
            uuidv4(),
            data.name,
            data.sex,
            data.dob,
            data.bio || null,
        ]);
    const res = {}
    res.results = result.rows[0];
    return res;
}

async function getActor(name) {
    const result = await db.query(
            `SELECT * FROM actors where name ILIKE $1;`,
            ['%'+name+'%']
        );
    const res = {};
    res.results = result.rows;
    return res;
}

async function allActors(offset, limit) {
    const result = await db.query(
            `SELECT * FROM actors OFFSET $1 LIMIT $2;`,
            [offset, limit]
        );
    const res = {};
    res.results = result.rows;
    if(result.rows.length>0)
    res.next = {
        page: offset + 2,
        limit: limit
    }
    if(offset>=1)
    res.previous = {
        page: offset,
        limit
    }
    return res;
}

async function updateActor(data) {
    if(!data.id){
        throw 'Provide id'
    }
    else{
        let actor = []
        if(data.name){
            const result = await db.query(
                `UPDATE actors SET name = $1 where id = $2 RETURNING *;`,
                [
                    data.name,
                    data.id
                ]
            )
            actor = result.rows[0]
        }
        if(data.sex){
            const result = await db.query(
                `UPDATE actors SET sex = $1 where id = $2 RETURNING *;`,
                [
                    data.sex,
                    data.id
                ]
            )
            actor = result.rows[0]
        }
        if(data.dob){
            const result = await db.query(
                `UPDATE actors SET dob = $1 where id = $2 RETURNING *;`,
                [
                    data.dob,
                    data.id
                ]
            )
            actor = result.rows[0]
        }
        if(data.bio){
            const result = await db.query(
                `UPDATE actors SET bio = $1 where id = $2 RETURNING *;`,
                [
                    data.bio,
                    data.id
                ]
            )
            actor = result.rows[0]
        }
        const res = {};
        res.results = actor;
        return res;
    }
}

async function removeActor(id) {
    const result = await db.query(
            `DELETE FROM actors where id = $1 RETURNING *;`,
            [id]
        );
    const res = {}
    res.results = result.rows[0];
    return res;
}

const Actors = {
    create,
    allActors,
    updateActor,
    getActor,
    removeActor
}
module.exports = Actors;