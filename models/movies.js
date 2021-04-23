const db = require('../db.js');
const { v4: uuidv4 } = require('uuid');

async function create(movie) {
    const result = await db.query(
        `INSERT INTO movies (id,
                            name,
                            plot,
                            poster,
                            producer,
                            actors)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
        [
            uuidv4(),
            movie.name,
            movie.plot || null,
            movie.poster || null,
            movie.producer || null,
            movie.actors || null
        ]);
    const res = {};
    res.results = result.rows[0];
    return res;
}
async function allMovies(offset, limit) {
    const result = await db.query(
            `SELECT * FROM movies OFFSET $1 LIMIT $2;`,
            [offset, limit]
        );
    const res = {};
    if(result.rows.length>0)
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
}
async function getMovieFromName(name) {
    const result = await db.query(
            `SELECT * FROM movies WHERE name ILIKE $1;`,
            ['%'+name+'%']
        );
    const res = {};
    res.results = result.rows;
    return res;
}
async function getMovieOfActor(name, offset, limit) {
    const result = await db.query(
            `SELECT * FROM movies, unnest(actors) a WHERE lower(a) ILIKE $1 OFFSET $2 LIMIT $3;`,
            ['%'+name+'%', offset, limit]
        );
    const res = {};
    if(result.rows.length>0)
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
}
async function getMovieOfProducer(name, offset, limit) {
    const result = await db.query(
            `SELECT * FROM movies where producer ILIKE $1 OFFSET $2 LIMIT $3;`,
            ['%'+name+'%', offset, limit]
        );
    const res = {};
    if(result.rows.length>0)
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
}
async function updateMovies(data) {
    console.log(data)
    if(!data.id){
        throw 'Provide id'
    }
    else{
        let movie = []
        console.log(data.name)
        if(data.name){
            const result = await db.query(
                `UPDATE movies SET name = $1 where id = $2 RETURNING *;`,
                [
                    data.name,
                    data.id
                ]
            )
            movie = result.rows[0]
        }
        if(data.plot){
            const result = await db.query(
                `UPDATE movies SET plot = $1 where id = $2 RETURNING *;`,
                [
                    data.plot,
                    data.id
                ]
            )
            movie = result.rows[0]
        }
        if(data.poster){
            const result = await db.query(
                `UPDATE movies SET poster = $1 where id = $2 RETURNING *;`,
                [
                    data.poster,
                    data.id
                ]
            )
            movie = result.rows[0]
        }
        if(data.producer){
            const result = await db.query(
                `UPDATE movies SET producer = $1 where id = $2 RETURNING *;`,
                [
                    data.producer,
                    data.id
                ]
            )
            movie = result.rows[0]
        }
        if(data.actors){
            const result = await db.query(
                `UPDATE movies SET actors = $1 where id = $2 RETURNING *;`,
                [
                    data.actors,
                    data.id
                ]
            )
            movie = result.rows[0]
        }
        const res = {}
        res.results = movie;
        return res;
    }
}
async function removeMovie(id) {
    const result = await db.query(
            `DELETE FROM movies where id = $1;`,
            [id]
        );
    const res = {};
    res.results = result.rows;
    return res;
}
const Movies = {
    create,
    allMovies,
    updateMovies,
    getMovieFromName,
    removeMovie,
    getMovieOfActor,
    getMovieOfProducer
}
module.exports = Movies;