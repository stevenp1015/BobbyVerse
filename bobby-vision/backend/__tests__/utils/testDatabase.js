const pool = require('../../../database');
const fs = require('fs').promises;
const path = require('path');

const migrationsDir = path.join(__dirname, '../../../database/migrations');

const connectTestDatabase = async () => {
  // Ensure test environment variables are loaded before this is called
  console.log('Connecting to test database...');
  // The pool should connect automatically when the first query is made
  // We might add a check here later if needed
};

const runMigrations = async () => {
  console.log('Running migrations...');
  try {
    const files = await fs.readdir(migrationsDir);
    const migrationFiles = files.filter(file => file.endsWith('.sql')).sort();

    for (const file of migrationFiles) {
      const filePath = path.join(migrationsDir, file);
      const sql = await fs.readFile(filePath, 'utf-8');
      await pool.query(sql);
      console.log(`Applied migration: ${file}`);
    }
  } catch (error) {
    console.error('Error running migrations:', error);
    throw error;
  }
};

const cleanDatabase = async () => {
  console.log('Cleaning database...');
  try {
    // Delete data from tables in reverse order of foreign key dependencies
    await pool.query('DELETE FROM documents;');
    await pool.query('DELETE FROM jobs;');
    await pool.query('DELETE FROM clients;');
    await pool.query('DELETE FROM service_library;');
    await pool.query('DELETE FROM materials;');
    await pool.query('DELETE FROM users;');
    console.log('Database cleaned.');
  } catch (error) {
    console.error('Error cleaning database:', error);
    throw error;
  }
};

const disconnectTestDatabase = async () => {
  console.log('Disconnecting from test database...');
  await pool.end();
  console.log('Test database connection ended.');
};

module.exports = {
  connectTestDatabase,
  runMigrations,
  cleanDatabase,
  disconnectTestDatabase,
};