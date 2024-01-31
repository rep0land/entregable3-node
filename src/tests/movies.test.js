const request = require('supertest');
const app = require('../app');
require('../models')
const Actor = require('../models/Actor');
const Genre = require('../models/Genre');
const Director = require('../models/Director');

let id;

test('GET /movies', async () => {
    const res = await request(app).get('/movies');
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /movies', async () => {
    const movie = {
        name: "the movie",
        image: "https://imagen.com",
        synopsis: "la pelicula es interesante",
        releaseYear: 2000-12-10
    }
    const res = await request(app).post('/movies').send(movie);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(movie.name);
    expect(res.body.id).toBeDefined();
});

test('PUT /movies/:id', async () => {
    const movieUpdated = { 
        name: "movie actualizada"
     }
    const res = await request(app).put(`/movies/${id}`).send(movieUpdated);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movieUpdated.name);
});

test('POST /movies/:id/actors', async () => {
    const actor = await Actor.create({
        firstName: "test actor",
        lastName: "test name", 
        nationality: "test estadounidense",
        image: "https://imagen.com",
        birthday: 2000-12-10
    })
    const res = await request(app)
    .post(`/movies/${id}/actors`)
    .send([ actor.id ]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test('POST /movies/:id/directors', async () => {
    const director = await Director.create({
        firstName: "test director",
        lastName: "test name", 
        nationality: "test estadounidense",
        image: "https://imagen.com",
        birthday: 2000-12-10
    })
    const res = await request(app)
    .post(`/movies/${id}/directors`)
    .send([ director.id ]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test('POST /movies/:id/genres', async () => {
    const genre = await Genre.create({
        name: "test genre",
    })
    const res = await request(app)
    .post(`/movies/${id}/genres`)
    .send([ genre.id ]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test('DELETE /movies/:id', async () => {
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
});


