const request = require('supertest');
const pool = require('../../database');
const { connectTestDatabase, runMigrations, cleanDatabase, disconnectTestDatabase } = require('../utils/testDatabase');

let app;
// Assuming your server.js exports the app instance:
app = require('../../server');

describe('Document Integration Tests', () => {
  beforeAll(async () => {
    await connectTestDatabase();
    await runMigrations();
  });

  afterAll(async () => {
    await disconnectTestDatabase();
  });

  beforeEach(async () => {
    await cleanDatabase();
    // Create a client and a job for document tests
    const clientResult = await pool.query(
      'INSERT INTO clients(name, phone, email, primary_address) VALUES($1, $2, $3, $4) RETURNING client_id',
      ['Test Client for Documents', '111-111-1111', 'document.test@example.com', '123 Document St']
    );
    const clientId = clientResult.rows[0].client_id;

    const jobResult = await pool.query(
      'INSERT INTO jobs(client_id, title, description, status, total_amount) VALUES($1, $2, $3, $4, $5) RETURNING job_id',
      [clientId, 'Test Job for Documents', 'This is a test job for document integration.', 'Pending', 500]
    );
    this.testJobId = jobResult.rows[0].job_id; // Use 'this' to make it available in tests
  });

  test('POST /api/documents should create a new document', async () => {
    const newDocument = {
      job_id: this.testJobId,
      document_type: 'Proposal',
      file_path: '/path/to/proposal.pdf',
      created_at: new Date()
    };

    const response = await request(app)
      .post('/api/documents')
      .send(newDocument);

    expect(response.statusCode).toBe(201);
    // Add more assertions

    // TODO: Query database to verify insertion
    // Example:
    // const documentInDb = await pool.query('SELECT * FROM documents WHERE document_id = $1', [response.body.document_id]);
    // expect(documentInDb.rows.length).toBe(1);
    // expect(documentInDb.rows[0].document_type).toBe(newDocument.document_type);

  });

  test('GET /api/documents should retrieve all documents', async () => {
    // This test assumes documents might be created in beforeEach or other tests run before this one
    // For a clean test, you might create a document specifically for this test
    const response = await request(app).get('/api/documents');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    // expect(response.body.length).toBeGreaterThan(0); // Only if you seed data for this test
  });

  test('GET /api/documents/:id should retrieve a specific document', async () => {
    // Create a document specifically for this test
    const newDocument = {
      job_id: this.testJobId,
      document_type: 'Specific Doc Test',
      file_path: '/path/to/specific.pdf',
      created_at: new Date()
    };
    const createResponse = await request(app)
      .post('/api/documents')
      .send(newDocument);
    const documentId = createResponse.body.document_id;

    const response = await request(app).get(`/api/documents/${documentId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('document_id', documentId);
    // Add more assertions about the document data
  });

  test('PUT /api/documents/:id should update a document', async () => {
    // Create a document specifically for this test
    const newDocument = {
      job_id: this.testJobId,
      document_type: 'Update Test Doc',
      file_path: '/path/to/update.pdf',
      created_at: new Date()
    };
    const createResponse = await request(app)
      .post('/api/documents')
      .send(newDocument);
    const documentId = createResponse.body.document_id;

    const updatedDocument = {
      document_type: 'Invoice',
      file_path: '/path/to/invoice.pdf'
    };

    const response = await request(app)
      .put(`/api/documents/${documentId}`)
      .send(updatedDocument);

    expect(response.statusCode).toBe(200);
    // Assuming the PUT endpoint returns the updated resource or a success message
    // expect(response.body).toHaveProperty('document_type', updatedDocument.document_type);
  });

  test('DELETE /api/documents/:id should delete a document', async () => {
    // Create a document specifically for this test
    const newDocument = {
      job_id: this.testJobId,
      document_type: 'Delete Test Doc',
      file_path: '/path/to/delete.pdf',
      created_at: new Date()
    };
    const createResponse = await request(app)
      .post('/api/documents')
      .send(newDocument);
    const documentId = createResponse.body.document_id;

    const response = await request(app).delete(`/api/documents/${documentId}`);

    expect(response.statusCode).toBe(204); // No Content on successful deletion

    // TODO: Query database to verify deletion
    // Example:
    // const documentInDb = await pool.query('SELECT * FROM documents WHERE document_id = $1', [documentId]);
    // expect(documentInDb.rows.length).toBe(0);
  });

  test('POST /api/documents should return 400 if required fields are missing', async () => {
    const invalidDocument = {}; // Missing job_id, document_type, etc.

    const response = await request(app)
      .post('/api/documents')
      .send(invalidDocument);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error'); // Assuming the error structure includes an 'error' field
  });

  test('GET /api/documents/:id should return 404 and error for non-existent document', async () => {
    const nonExistentDocumentId = 9999; // Assuming this ID does not exist

    const response = await request(app).get(`/api/documents/${nonExistentDocumentId}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error'); // Assuming the error handler formats this way
  });

  test('PUT /api/documents/:id should return 404 and error for non-existent document', async () => {
    const nonExistentDocumentId = 9999; // Assuming this ID does not exist
    const updatedDocumentData = { document_type: 'Attempted Update' };

    const response = await request(app)
      .put(`/api/documents/${nonExistentDocumentId}`)
      .send(updatedDocumentData);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error'); // Assuming the error handler formats this way
  });

  test('/api/documents/:id/send-email should send an email successfully', async () => {
    // Mock the sendEmail function
    const emailService = require('../../services/emailService');
    const sendEmailMock = jest.spyOn(emailService, 'sendEmail');
    sendEmailMock.mockResolvedValue({}); // Mock a successful email send

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
      document_type: 'Invoice',
      file_path: '/path/to/invoice_email_test.pdf', // Changed file path for clarity
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
    // We need to query the database to get the client's email associated with the document's job
    const clientEmailResult = await pool.query('SELECT c.email FROM clients c JOIN jobs j ON c.client_id = j.client_id WHERE j.job_id = $1', [jobId]);
    const clientEmail = clientEmailResult.rows[0].email;

    expect(sendEmailMock).toHaveBeenCalledTimes(1);
    expect(sendEmailMock).toHaveBeenCalledWith(documentId, clientEmail);

    sendEmailMock.mockRestore(); // Restore the original function
  });
});
