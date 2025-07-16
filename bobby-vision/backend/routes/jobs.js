const express = require('express');
const router = express.Router();
const { NotFoundError, ValidationError, DatabaseError } = require('../utils/errors');
const pool = require('../database'); // Assuming your database connection pool is exported from here

// GET all jobs
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM jobs');
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// GET a specific job by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM jobs WHERE job_id = $1', [id]);
    if (result.rows.length === 0) {
      throw new NotFoundError('Job not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// POST create a new job
router.post('/', async (req, res) => {
  const { client_id, title, description, status, total_amount } = req.body;
  try {
    // Optional: Check if client_id exists in the clients table before creating job
    const clientCheck = await pool.query('SELECT client_id FROM clients WHERE client_id = $1', [client_id]);
    if (clientCheck.rows.length === 0) {
        throw new NotFoundError('Client not found');
    }

    // Basic validation for required fields
    if (!title || !description || !status || total_amount === undefined) {
        throw new ValidationError('Missing required job fields');
    }

    const result = await pool.query(
      'INSERT INTO jobs (client_id, title, description, status, total_amount) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [client_id, title, description, status, total_amount]
    );
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// PUT update a job
router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { client_id, title, description, status, total_amount } = req.body;
  try {
     // Optional: Check if client_id exists in the clients table if it's being updated
    if (client_id) {
        const clientCheck = await pool.query('SELECT client_id FROM clients WHERE client_id = $1', [client_id]);
        if (clientCheck.rows.length === 0) {
            throw new NotFoundError('Client not found');
        }
    }

    // Basic validation for required fields if they are present in the body
    if (title === undefined || description === undefined || status === undefined || total_amount === undefined) {
         throw new ValidationError('Missing required job fields for update');
    }

    const result = await pool.query(
      'UPDATE jobs SET client_id = $1, title = $2, description = $3, status = $4, total_amount = $5 WHERE job_id = $6 RETURNING *',
      [client_id, title, description, status, total_amount, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ msg: 'Job not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});


// DELETE a job
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM jobs WHERE job_id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      throw new NotFoundError('Job not found');
    }
    res.json({ msg: 'Job deleted', job: result.rows[0] });
  } catch (err) {
    next(err);
  }
});

module.exports = router;