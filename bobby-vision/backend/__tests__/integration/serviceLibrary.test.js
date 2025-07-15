const request = require('supertest');
const pool = require('../../../database');
const { connectTestDatabase, runMigrations, cleanDatabase, disconnectTestDatabase } = require('../utils/testDatabase');


let app;

describe('Service Library Integration Tests', () => {
  beforeAll(async () => {
    app = require('../../../backend/server'); // Assuming server.js exports the app
    await connectTestDatabase();
 await runMigrations();
  });

  afterAll(async () => {
    await disconnectTestDatabase();
  });
  beforeEach(async () => {
    await cleanDatabase();
  });

  test('POST /api/services should create a new service', async () => {
    const newService = {
      name: 'Integration Test Service',
      description: 'This is a test service.',
      estimated_material_cost: 100,
      estimated_labor_cost: 200
    };

    const response = await request(app)
      .post('/api/services')
      .send(newService);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('service_id');
 expect(response.body.name).toBe(newService.name);
 expect(response.body.description).toBe(newService.description);

    const serviceInDb = await pool.query('SELECT * FROM service_library WHERE name = $1', [newService.name]);
    expect(serviceInDb.rows.length).toBe(1);
    expect(serviceInDb.rows[0].description).toBe(newService.description);
  });

  test('GET /api/services should retrieve all services', async () => {
    await pool.query('INSERT INTO service_library (name, description, estimated_material_cost, estimated_labor_cost) VALUES ($1, $2, $3, $4)', ['Service 1', 'Desc 1', 50, 100]);
    await pool.query('INSERT INTO service_library (name, description, estimated_material_cost, estimated_labor_cost) VALUES ($1, $2, $3, $4)', ['Service 2', 'Desc 2', 75, 150]);

    const response = await request(app)
      .get('/api/services');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
  });

  test('GET /api/services/:id should retrieve a specific service', async () => {
    const result = await pool.query('INSERT INTO service_library (name, description, estimated_material_cost, estimated_labor_cost) VALUES ($1, $2, $3, $4) RETURNING service_id', ['Specific Service', 'Specific Desc', 120, 240]);
    const serviceId = result.rows[0].service_id;

    const response = await request(app)
      .get(`/api/services/${serviceId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('service_id', serviceId);
    expect(response.body.name).toBe('Specific Service');
  });

  test('GET /api/services/:id should return 404 if service not found', async () => {
    const nonExistentServiceId = 9999;
    const response = await request(app)
      .get(`/api/services/${nonExistentServiceId}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error', 'Service not found');
  });

  test('PUT /api/services/:id should update a service', async () => {
    const result = await pool.query('INSERT INTO service_library (name, description, estimated_material_cost, estimated_labor_cost) VALUES ($1, $2, $3, $4) RETURNING service_id', ['Service to Update', 'Original Desc', 100, 200]);
    const serviceId = result.rows[0].service_id;

    const updatedServiceData = {
      name: 'Updated Service Name',
      description: 'Updated description.',
      estimated_material_cost: 150
    };

    const response = await request(app)
      .put(`/api/services/${serviceId}`)
      .send(updatedServiceData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('service_id', serviceId);
    expect(response.body.name).toBe(updatedServiceData.name);
    expect(response.body.estimated_material_cost).toBe(updatedServiceData.estimated_material_cost);

    const serviceInDb = await pool.query('SELECT * FROM service_library WHERE service_id = $1', [serviceId]);
    expect(serviceInDb.rows.length).toBe(1);
    expect(serviceInDb.rows[0].name).toBe(updatedServiceData.name);
  });

  test('DELETE /api/services/:id should delete a service', async () => {
    const result = await pool.query('INSERT INTO service_library (name, description, estimated_material_cost, estimated_labor_cost) VALUES ($1, $2, $3, $4) RETURNING service_id', ['Service to Delete', 'Delete Desc', 200, 300]);
    const serviceId = result.rows[0].service_id;

    const response = await request(app)
      .delete(`/api/services/${serviceId}`);

    expect(response.statusCode).toBe(204); // No Content

    const serviceInDb = await pool.query('SELECT * FROM service_library WHERE service_id = $1', [serviceId]);
    expect(serviceInDb.rows.length).toBe(0);
  });

  test('POST /api/services should return 400 for missing required fields', async () => {
    const invalidServiceData = {}; // Missing name, description, etc.

    const response = await request(app)
      .post('/api/services')
      .send(invalidServiceData);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error'); // Assuming the error handler formats this way
    // Add more specific assertions based on expected validation error message
  });

  test('PUT /api/services/:id should return 404 and error for non-existent service', async () => {
    const nonExistentServiceId = 9999; // Assuming this ID does not exist
    const updatedServiceData = {
      name: 'Attempted Update',
      description: 'This should not work.',
    };

    const response = await request(app)
      .put(`/api/services/${nonExistentServiceId}`)
      .send(updatedServiceData);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error'); // Assuming the error handler formats this way
  });

  test('DELETE /api/services/:id should return 404 and error for non-existent service', async () => {
    const nonExistentServiceId = 9999; // Assuming this ID does not exist

    const response = await request(app).delete(`/api/services/${nonExistentServiceId}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error'); // Assuming the error handler formats this way
  });
});