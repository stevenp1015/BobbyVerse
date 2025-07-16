const request = require('supertest');
const pool = require('../../database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing in test setup

// Assuming you have a test database setup utility
const { connectTestDatabase, runMigrations, cleanDatabase, disconnectTestDatabase } = require('../utils/testDatabase');

// Assuming you export your Express app from server.js
const app = require('../../server');

describe('Authentication Integration Tests', () => {
  let testUser;
  let testUserToken;
  const testPassword = 'testpassword123'; // Define a plain text password for the test user

  beforeAll(async () => {
    await connectTestDatabase();
    await runMigrations();
    // Create a test user directly in the database
    const bobbyPassword = await bcrypt.hash(testPassword, 10); // Hash the password
    const bobbyResult = await pool.query(
      'INSERT INTO users(username, password, role) VALUES($1, $2, $3) RETURNING user_id, username, role',
      ['testbobby', bobbyPassword, 'bobby']
    );
    testUser = bobbyResult.rows[0];
    // Generate a valid token for the test user
    testUserToken = jwt.sign({ userId: testUser.user_id, role: testUser.role }, process.env.JWT_SECRET || 'testsecret', { expiresIn: '1h' }); // Use a fallback secret for testing

    const clientPassword = await bcrypt.hash(testPassword, 10);
    const clientResult = await pool.query(
      'INSERT INTO users(username, password, role) VALUES($1, $2, $3) RETURNING user_id, username, role',
      ['testclient', clientPassword, 'client']
    );
    const testClient = clientResult.rows[0];
    const testClientToken = jwt.sign({ userId: testClient.user_id, role: testClient.role }, process.env.JWT_SECRET || 'testsecret', { expiresIn: '1h' });
  });

  afterAll(async () => {
    await cleanDatabase(); // Clean up the database after all tests
    await disconnectTestDatabase();
  });

  beforeEach(async () => {
    // Clean up specific data if needed before each test, but cleanDatabase in afterAll might be sufficient
  });

  test('POST /api/login should return a JWT for valid credentials', async () => {
    const validCredentials = {
      username: 'testuser',
      password: testPassword, // Use the plain text password
    };

    const response = await request(app)
      .post('/api/login')
      .send(validCredentials);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
    // Optional: Verify the token by decoding it
    const decodedToken = jwt.verify(response.body.token, process.env.JWT_SECRET || 'testsecret');
    expect(decodedToken.userId).toBe(testUser.user_id);
    expect(decodedToken.role).toBe(testUser.role);
  });

  test('POST /api/login should return 401 for incorrect password', async () => {
    const invalidCredentials = {
      username: 'testuser',
      password: 'wrongpassword',
    };

    const response = await request(app)
      .post('/api/login')
      .send(invalidCredentials);

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Invalid credentials'); // Or similar message from your error handling
  });

  test('POST /api/login should return 401 for incorrect username', async () => {
    const invalidCredentials = {
      username: 'nonexistentuser',
      password: testPassword,
    };

    const response = await request(app)
      .post('/api/login')
      .send(invalidCredentials);

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Invalid credentials'); // Or similar message
  });

  test('POST /api/login should return validation error for missing credentials', async () => {
    const invalidCredentials = {
      username: 'testuser',
      // password missing
    };

    const response = await request(app)
      .post('/api/login')
      .send(invalidCredentials);

    // Depending on your validation implementation, this might be 400 or 401
    expect(response.statusCode).toBeLessThan(500); // Should be a client error
    expect(response.body).toHaveProperty('error');
    // expect(response.body.error).toBe('Validation failed'); // Or similar message
  });


  test('Accessing protected route without token should return 401', async () => {
    // Assuming '/api/clients' is a protected route
    const response = await request(app).get('/api/clients');

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Unauthorized'); // Or similar message from your middleware
  });

  test('Accessing protected route with invalid token should return 403', async () => {
    const invalidToken = 'invalid.jwt.token.12345'; // A clearly invalid token

    const response = await request(app)
      .get('/api/clients')
      .set('Authorization', `Bearer ${invalidToken}`);

    expect(response.statusCode).toBe(403);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Forbidden'); // Or similar message
  });

  test('Accessing protected route with expired token should return 403', async () => {
    // Generate an expired token
    const expiredToken = jwt.sign({ userId: testUser.user_id, role: testUser.role }, process.env.JWT_SECRET || 'testsecret', { expiresIn: '0s' });

    const response = await request(app)
      .get('/api/clients')
      .set('Authorization', `Bearer ${expiredToken}`);

    expect(response.statusCode).toBe(403);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Forbidden'); // Or similar message
  });


  test('Accessing protected route with valid token should return 200', async () => {
    // Assuming '/api/clients' is a protected route
    const response = await request(app)
      .get('/api/clients')
      .set('Authorization', `Bearer ${testUserToken}`);

    expect(response.statusCode).toBe(200);
    // Expect a body based on your /api/clients implementation (e.g., an array of clients)
    expect(response.body).toBeDefined();
    // Add assertions to check the structure or content of the successful response if needed
  });

  test('Accessing bobby-only route with client token should return 403', async () => {
    const response = await request(app)
      .get('/api/clients')
      .set('Authorization', `Bearer ${testClientToken}`);

    expect(response.statusCode).toBe(403);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Forbidden');
  });
});
