const request = require('supertest');
const pool = require('../../database');
const {
 connectTestDatabase,
 runMigrations,
 cleanDatabase,
 disconnectTestDatabase,
} = require('../utils/testDatabase');

let app;

describe('Materials Integration Tests', () => {
  beforeAll(async () => {
 await connectTestDatabase();
 await runMigrations();
  });

 afterAll(async () => {
 await disconnectTestDatabase();
  });

  test('POST /api/materials should create a new material', async () => {
    const newMaterialData = {
      name: 'Integration Test Material',
      unit_cost: 10.50,
      supplier_info: 'Test Supplier'
    };

    // Assuming app is exported from server.js
    app = require('../../../server');

    const response = await request(app)
      .post('/api/materials')
 .send(newMaterialData);

 expect(response.statusCode).toBe(201);
 expect(response.body).toHaveProperty('material_id');
 expect(response.body.name).toBe(newMaterialData.name);
 expect(response.body.unit_cost).toBe(newMaterialData.unit_cost);
 expect(response.body.supplier_info).toBe(newMaterialData.supplier_info);

    const materialInDb = await pool.query('SELECT * FROM materials WHERE material_id = $1', [response.body.material_id]);
 expect(materialInDb.rows.length).toBe(1);
 expect(materialInDb.rows[0].name).toBe(newMaterialData.name);
  });

  test('GET /api/materials should retrieve all materials', async () => {
    await pool.query('INSERT INTO materials (name, unit_cost) VALUES ($1, $2)', ['Material 1', 5.00]);
 await pool.query('INSERT INTO materials (name, unit_cost) VALUES ($1, $2)', ['Material 2', 15.00]);

    app = require('../../../server');
    const response = await request(app).get('/api/materials');

 expect(response.statusCode).toBe(200);
 expect(Array.isArray(response.body)).toBe(true);
 expect(response.body.length).toBe(2);
  });

  test('GET /api/materials/:id should retrieve a specific material', async () => {
    const result = await pool.query('INSERT INTO materials (name, unit_cost) VALUES ($1, $2) RETURNING material_id', ['Specific Material', 25.00]);
 const materialId = result.rows[0].material_id;

    app = require('../../../server');
    const response = await request(app).get(`/api/materials/${materialId}`);

 expect(response.statusCode).toBe(200);
 expect(response.body).toHaveProperty('material_id', materialId);
 expect(response.body.name).toBe('Specific Material');
  });

  test('PUT /api/materials/:id should update a material', async () => {
    const result = await pool.query('INSERT INTO materials (name, unit_cost) VALUES ($1, $2) RETURNING material_id', ['Material to Update', 30.00]);
 const materialId = result.rows[0].material_id;

    const updatedMaterialData = {
 name: 'Updated Material Name',
 unit_cost: 35.50,
    };

    app = require('../../../server');
    const response = await request(app)
 .put(`/api/materials/${materialId}`)
 .send(updatedMaterialData);

 expect(response.statusCode).toBe(200);
 expect(response.body).toHaveProperty('material_id', materialId);
 expect(response.body.name).toBe(updatedMaterialData.name);
 expect(response.body.unit_cost).toBe(updatedMaterialData.unit_cost);
  });

  test('DELETE /api/materials/:id should delete a material', async () => {
    const result = await pool.query('INSERT INTO materials (name, unit_cost) VALUES ($1, $2) RETURNING material_id', ['Material to Delete', 40.00]);
 const materialId = result.rows[0].material_id;

    app = require('../../../server');
    const response = await request(app).delete(`/api/materials/${materialId}`);

 expect(response.statusCode).toBe(204); // No Content

    const materialInDb = await pool.query('SELECT * FROM materials WHERE material_id = $1', [materialId]);
 expect(materialInDb.rows.length).toBe(0);
  });

  test('POST /api/materials should return 400 for missing required fields', async () => {
    app = require('../../../server');
    const response = await request(app).post('/api/materials').send({}); // Missing name, unit_cost
 expect(response.statusCode).toBe(400);
 expect(response.body).toHaveProperty('error'); // Assuming the error handler formats this way
  });

  test('GET /api/materials/:id should return 404 and error for non-existent material', async () => {
    const nonExistentMaterialId = 9999; // Assuming this ID does not exist
    app = require('../../../server');
    const response = await request(app).get(`/api/materials/${nonExistentMaterialId}`);
 expect(response.statusCode).toBe(404);
 expect(response.body).toHaveProperty('error'); // Assuming the error handler formats this way
  });

  test('PUT /api/materials/:id should return 404 and error for non-existent material', async () => {
    const nonExistentMaterialId = 9999; // Assuming this ID does not exist
    const updatedMaterialData = {
 name: 'Attempted Update',
 unit_cost: 50.00,
    };
    app = require('../../../server');
    const response = await request(app)
 .put(`/api/materials/${nonExistentMaterialId}`)
 .send(updatedMaterialData);
 expect(response.statusCode).toBe(404);
 expect(response.body).toHaveProperty('error'); // Assuming the error handler formats this way
  });

  test('DELETE /api/materials/:id should return 404 and error for non-existent material', async () => {
    const nonExistentMaterialId = 9999; // Assuming this ID does not exist
    app = require('../../../server');
    const response = await request(app).delete(`/api/materials/${nonExistentMaterialId}`);
 expect(response.statusCode).toBe(404);
 expect(response.body).toHaveProperty('error'); // Assuming the error handler formats this way
  });

  beforeEach(async () => {
 await cleanDatabase();
  });
});