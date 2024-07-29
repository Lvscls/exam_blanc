const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../server'); 

describe('API Tests', () => {
  let token;

  beforeAll(async () => {
    const response = await request(app)
      .post('/api/signin')
      .send({
        email: 'garagiste@vroumvroum.fr',
        password: 'Azerty@01',
      });

    token = response.headers['set-cookie'][0].split(';')[0].split('=')[1];
  });

  test('POST /api/signin should authenticate a user and return a token', async () => {
    const response = await request(app)
      .post('/api/signin')
      .send({
        email: 'garagiste@vroumvroum.fr',
        password: 'Azerty@01',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('auth', true);
    expect(response.body).toHaveProperty('role', 'admin');
    expect(response.headers['set-cookie'][0]).toMatch(/token=/);
  });

  test('GET /api/cars should list all cars', async () => {
    const response = await request(app)
      .get('/api/cars')
      .set('Cookie', [`token=${token}`]);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        immatriculation: expect.any(String),
        marque: expect.any(String),
        modele: expect.any(String),
        annee: expect.any(Number),
        client_id: expect.any(Number),
        lastname: expect.any(String),
        firstname: expect.any(String),
      }),
    ]));
  });

  test('PUT /api/cars/:id should update a car', async () => {
    const carId = 'AB-123-CD'; 

    const response = await request(app)
      .put(`/api/cars/${carId}`)
      .set('Cookie', [`token=${token}`])
      .send({
        immatriculation: 'AB-123-CD',
        marque: 'Toyota',
        modele: 'Corolla',
        annee: 2021,
        client_id: 1,
      });

    expect(response.status).toBe(200);
    expect(response.text).toBe('Car updated');
  });

  test('DELETE /api/cars/:id should delete a car', async () => {
    const carId = 'AB-123-CD'; 

    const response = await request(app)
      .delete(`/api/cars/${carId}`)
      .set('Cookie', [`token=${token}`]);

    expect(response.status).toBe(200);
    expect(response.text).toBe('Car deleted');
  });
});
