const express = require('express');
const router = express.Router();
const pool = require('../database'); // Assuming your database connection pool is exported from ../database/index.js
const { NotFoundError, ValidationError, DatabaseError } = require('../utils/errors');

// GET all materials
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM materials');
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

// GET a single material by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM materials WHERE material_id = $1', [id]);
    if (result.rows.length === 0) {
      throw new NotFoundError('Material not found');
    }
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// POST create a new material
router.post('/', async (req, res) => {
  const { name, unit_cost, supplier_info } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO materials (name, unit_cost, supplier_info) VALUES ($1, $2, $3) RETURNING *',
      [name, unit_cost, supplier_info]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// PUT update a material by id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, unit_cost, supplier_info } = req.body;
  try {
    const result = await pool.query(
      'UPDATE materials SET name = $1, unit_cost = $2, supplier_info = $3 WHERE material_id = $4 RETURNING *',
      [name, unit_cost, supplier_info, id]
    );
    if (result.rows.length === 0) {
      throw new NotFoundError('Material not found');
    }
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// DELETE a material by id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM materials WHERE material_id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      throw new NotFoundError('Material not found');
    }
    res.json({ message: 'Material deleted successfully', deletedMaterial: result.rows[0] });
  } catch (error) {
    next(error);
  }
});

module.exports = router;