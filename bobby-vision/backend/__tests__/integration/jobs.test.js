const request = require('supertest');
const pool = require('../../database');
const { connectTestDatabase, runMigrations, cleanDatabase, disconnectTestDatabase } = require('../utils/testDatabase');

const app = require('../../server');

jest.mock('../../services/emailService');

let testClientId;

describe('Job Integration Tests', () => {
  beforeAll(async () => {
    await connectTestDatabase();
    await runMigrations();
  });

  afterAll(async () => {
    await disconnectTestDatabase();
  });

  beforeEach(async () => {
    await cleanDatabase();
    // Create a client for job tests
    const clientResult = await pool.query('INSERT INTO clients (name, email) VALUES ($1, $2) RETURNING client_id', ['Test Client for Jobs', 'job.test.client@example.com']);
    testClientId = clientResult.rows[0].client_id;
  });

  test('POST /api/jobs should create a new job', async () => {
    // TODO: Create a client first to get a client_id
    const newJob = {
      client_id: 1, // Placeholder, needs a real client ID from test setup
      title: 'Integration Test Job',
      description: 'This is a test job.',
      status: 'Pending',
      total_amount: 1000
    };

    const response = await request(app)
      .post('/api/jobs')
      .send(newJob);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('job_id');
    // Add more assertions

    // TODO: Query database to verify insertion

    expect(true).toBe(true);
  });

  test('GET /api/jobs should retrieve all jobs', async () => {
    // TODO: Seed some jobs in the database first

    // Seed a job for the test
    await pool.query('INSERT INTO jobs (client_id, title, status) VALUES ($1, $2, $3)', [testClientId, 'Job 1', 'Pending']);
    await pool.query('INSERT INTO jobs (client_id, title, status) VALUES ($1, $2, $3)', [testClientId, 'Job 2', 'Completed']);

    const response = await request(app).get('/api/jobs');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2); // Assuming you seeded 2 jobs
    // Add more assertions to check the structure of job objects
    expect(response.body[0]).toHaveProperty('job_id');

    expect(true).toBe(true);
  });

  test('GET /api/jobs/:id should retrieve a specific job', async () => {
    // TODO: Seed a specific job with a known ID

    const jobResult = await pool.query('INSERT INTO jobs (client_id, title, status) VALUES ($1, $2, $3) RETURNING job_id', [testClientId, 'Job to Retrieve', 'Pending']);
    const jobId = jobResult.rows[0].job_id;

    const response = await request(app).get(`/api/jobs/${jobId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('job_id', jobId);
    expect(response.body).toHaveProperty('title', 'Job to Retrieve');
    // Add more assertions to check the job data

    expect(true).toBe(true);
  });

  test('GET /api/jobs/:id should return 404 if job not found', async () => {
    const nonExistentJobId = 999;
    const response = await request(app).get(`/api/jobs/${nonExistentJobId}`);
    expect(response.statusCode).toBe(404);
  });

  test('PUT /api/jobs/:id should update a job', async () => {
    // TODO: Seed a specific job with a known ID

    const jobResult = await pool.query('INSERT INTO jobs (client_id, title, status, total_amount) VALUES ($1, $2, $3, $4) RETURNING job_id', [testClientId, 'Job to Update', 'Pending', 1000]);
    const jobId = jobResult.rows[0].job_id;
    const updatedJobData = {
      title: 'Updated Integration Test Job',
      status: 'Completed',
      total_amount: 1500
    };

    const response = await request(app)
      .put(`/api/jobs/${jobId}`)
      .send(updatedJobData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('job_id', jobId);
    // Add more assertions to check if the response reflects the update

    // TODO: Query database to verify update

    expect(true).toBe(true);
  });

  test('DELETE /api/jobs/:id should delete a job', async () => {
    // TODO: Seed a specific job with a known ID

    const jobResult = await pool.query('INSERT INTO jobs (client_id, title, status) VALUES ($1, $2, $3) RETURNING job_id', [testClientId, 'Job to Delete', 'Pending']);
    const jobId = jobResult.rows[0].job_id;

    const response = await request(app).delete(`/api/jobs/${jobId}`);

    expect(response.statusCode).toBe(204); // Or 200 with a success message

    // TODO: Query database to verify deletion (should not exist)
    const deletedJobResult = await pool.query('SELECT * FROM jobs WHERE job_id = $1', [jobId]);
    expect(deletedJobResult.rows.length).toBe(0);
  });

  test('DELETE /api/jobs/:id should return 404 if job not found', async () => {
    const nonExistentJobId = 999;
    const response = await request(app).delete(`/api/jobs/${nonExistentJobId}`);
    expect(response.statusCode).toBe(404);
  });

  test('Should create client, job, document, and attempt to send email', async () => {
    // Mock the sendEmail function
    const { sendEmail } = require('../../services/emailService');
    sendEmail.mockResolvedValue({}); // Mock a successful email send

    // 1. Create a new client
    const clientData = {
      name: 'Client for Email Test',
      email: 'email.test.client@example.com',
      primary_address: '123 Email St',
    };
    const clientResponse = await request(app)
      .post('/api/clients')
      .send(clientData);
    expect(clientResponse.statusCode).toBe(201);
    const clientId = clientResponse.body.client_id;

    // 2. Create a new job linked to the client
    const jobData = {
      client_id: clientId,
      title: 'Email Test Job',
      status: 'Pending',
    };
    const jobResponse = await request(app)
      .post('/api/jobs')
      .send(jobData);
    expect(jobResponse.statusCode).toBe(201);
    const jobId = jobResponse.body.job_id;

    // 3. Create a new document linked to the job
    const documentData = {
      job_id: jobId,
      type: 'Invoice',
      content: 'Invoice details for email test.',
    };
    const documentResponse = await request(app)
      .post('/api/documents')
      .send(documentData);
    expect(documentResponse.statusCode).toBe(201);
    const documentId = documentResponse.body.document_id;

    // 4. Attempt to send an email for the document
    const emailResponse = await request(app)
      .post(`/api/documents/${documentId}/send-email`);
    expect(emailResponse.statusCode).toBe(200);
    expect(emailResponse.body).toHaveProperty('message', 'Email sent successfully');

    // 5. Assert that sendEmail was called
    expect(sendEmail).toHaveBeenCalledTimes(1);
    expect(sendEmail).toHaveBeenCalledWith(documentId, clientData.email);
  });

  test('POST /api/jobs should return 400 for missing required fields', async () => {
    const invalidJobData = {}; // Missing client_id, title, etc.

    const response = await request(app)
      .post('/api/jobs')
      .send(invalidJobData);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error'); // Assuming the error handler formats this way
    // Add more specific assertions based on expected validation error message
  });

test('GET /api/jobs/:id should return 404 and error for non-existent job', async () => {
    const nonExistentJobId = 9999; // Assuming this ID does not exist

    const response = await request(app).get(`/api/jobs/${nonExistentJobId}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error'); // Assuming the error handler formats this way
  });

test('PUT /api/jobs/:id should return 404 and error for non-existent job', async () => {
    const nonExistentJobId = 9999; // Assuming this ID does not exist
    const updatedJobData = {
      title: 'Attempted Update',
      status: 'Completed',
    };

    const response = await request(app)
      .put(`/api/jobs/${nonExistentJobId}`)
      .send(updatedJobData);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error'); // Assuming the error handler formats this way
  });

test('DELETE /api/jobs/:id should return 404 and error for non-existent job', async () => {
    const nonExistentJobId = 9999; // Assuming this ID does not exist

    const response = await request(app).delete(`/api/jobs/${nonExistentJobId}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error'); // Assuming the error handler formats this way
  });

  test('POST /api/jobs should return 500 on database error', async () => {
    // Mock pool.query to throw an error
    const mockQuery = jest.spyOn(pool, 'query');
    mockQuery.mockImplementationOnce(() => {
      throw new Error('Simulated database error');
    });

    const newJob = {
      client_id: testClientId,
      title: 'Job with DB Error',
      status: 'Pending',
    };

    const response = await request(app)
      .post('/api/jobs')
      .send(newJob);

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('error'); // Assuming the error handler formats this way

    // Restore the original pool.query implementation
    mockQuery.mockRestore();
  });
});