const request = require('supertest');
const app = require('../app');

let id;

test('GET /directors', async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /directors', async () => {
    const director = {
        firstName: "director",
        lastName: "name", 
        nationality: "estadounidense",
        image: "https://imagen.com",
        birthday: 2000-12-10
    }
    const res = await request(app).post('/directors').send(director);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(director.firstName);
    expect(res.body.id).toBeDefined();
});

test('PUT /directors/:id', async () => {
    const directorUpdated = { 
        firstName: "director actualizado"
     }
    const res = await request(app).put(`/directors/${id}`).send(directorUpdated);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(directorUpdated.firstName);
});

test('DELETE /directors/:id', async () => {
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204);
});

