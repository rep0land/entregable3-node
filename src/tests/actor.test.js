const request = require('supertest');
const app = require('../app');

let id;

test('GET /actors', async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /actors', async () => {
    const actor = {
        firstName: "actor",
        lastName: "name", 
        nationality: "estadounidense",
        image: "https://imagen.com",
        birthday: 2000-12-10
    }
    const res = await request(app).post('/actors').send(actor);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(actor.firstName);
    expect(res.body.id).toBeDefined();
});

test('PUT /actors/:id', async () => {
    const actorUpdated = { 
        firstName: "actor actualizado"
     }
    const res = await request(app).put(`/actors/${id}`).send(actorUpdated);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(actorUpdated.firstName);
});

test('DELETE /actors/:id', async () => {
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204);
});


