const express = require('express');
const router = express.Router();
const { NotFoundError, ValidationError, DatabaseError } = require('../utils/errors');
const pool = require('../database'); // Assuming your database connection pool is exported from here

// GET all services
router.get('/services', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM service_library');    res.json(result.rows);
  }
 catch (err) { next(err); }
});

// GET a specific service by id
router.get('/services/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM service_library WHERE service_id = $1', [id]);
 if (result.rows.length === 0) { throw new NotFoundError('Service not found'); }
    res.json(result.rows[0]);  }
 catch (err) { next(err); }
  }
});

// POST create a new service
router.post('/services', async (req, res) => {
  const { name, description, estimated_material_cost, estimated_labor_cost } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO service_library (name, description, estimated_material_cost, estimated_labor_cost) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, estimated_material_cost, estimated_labor_cost]
    );
    res.status(201).json(result.rows[0]);  }
 catch (err) { next(err); }
  }
});

// PUT update a service by id
router.put('/services/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, estimated_material_cost, estimated_labor_cost } = req.body;
  try {
    const result = await pool.query(
      'UPDATE service_library SET name = $1, description = $2, estimated_material_cost = $3, estimated_labor_cost = $4 WHERE service_id = $5 RETURNING *',
      [name, description, estimated_material_cost, estimated_labor_cost, id]
    );
    if (result.rows.length === 0) {
 throw new NotFoundError('Service not found');
    }
    res.json(result.rows[0]);  }
 catch (err) { next(err); }
  }
});

// DELETE delete a service by id
router.delete('/services/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM service_library WHERE service_id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
 throw new NotFoundError('Service not found');
    }
    res.json({ message: 'Service deleted successfully' });  }
 catch (err) { next(err); }
  }
});

module.exports = router;