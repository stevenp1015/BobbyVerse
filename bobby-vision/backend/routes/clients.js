const express = require('express');
const router = express.Router();
const pool = require('../database'); // Assuming database/index.js is in the parent directory of routes
const { NotFoundError, ValidationError, ApiError } = require('../utils/errors');

// GET all clients
router.get('/clients', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clients');
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// POST new client
router.post('/clients', async (req, res) => {
  const { name, phone, email, primary_address } = req.body;

  if (!name || !primary_address) {
    return next(new ValidationError('Name and primary address are required'));
  }

  try {
    const result = await pool.query(
      'INSERT INTO clients (name, phone, email, primary_address) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, phone, email, primary_address]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// PUT update client
router.put('/clients/:id', async (req, res) => {
  const client_id = req.params.id;
  const { name, phone, email, primary_address } = req.body;

  try {
    const result = await pool.query(
      'UPDATE clients SET name = $1, phone = $2, email = $3, primary_address = $4 WHERE client_id = $5 RETURNING *',
      [name, phone, email, primary_address, client_id]
    );

    if (result.rows.length === 0) {
      throw new NotFoundError('Client not found');
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// DELETE client
router.delete('/clients/:id', async (req, res) => {
  const client_id = req.params.id;
  try {
    await pool.query('DELETE FROM clients WHERE client_id = $1', [client_id]);
    res.status(204).send(); // No content on successful deletion
  } catch (err) {
    next(err);
  }
});

module.exports = router;