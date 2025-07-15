const express = require('express');
const router = express.Router();
const emailService = require('../services/emailService'); // Import the email service
const { NotFoundError, ValidationError, DatabaseError } = require('../utils/errors'); // Import custom error classes
const pool = require('../database'); // Assuming your database connection pool is exported from here

// GET all documents
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM documents');
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// GET a specific document by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM documents WHERE document_id = $1', [id]);
    if (result.rows.length === 0) {
      throw new NotFoundError('Document not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// POST a new document
router.post('/', async (req, res) => {
  const { job_id, document_type, file_path, created_at } = req.body;
  try {
    // Optional: Validate job_id exists in the jobs table
    const jobCheck = await pool.query('SELECT job_id FROM jobs WHERE job_id = $1', [job_id]);
    if (jobCheck.rows.length === 0) {
      throw new ValidationError('Job ID does not exist');
    }

    const newDocument = await pool.query(
      'INSERT INTO documents (job_id, document_type, file_path, created_at) VALUES ($1, $2, $3, $4) RETURNING *',
      [job_id, document_type, file_path, created_at]
    );
    res.json(newDocument.rows[0]);
  } catch (err) {
    next(err);
  }
});

// PUT update a document
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { job_id, document_type, file_path, created_at } = req.body;
  try {
    let updateQuery = 'UPDATE documents SET ';
    const updateValues = [];
    const updateParams = [];
    let paramIndex = 1;

    if (job_id !== undefined) {
      // Optional: Validate job_id exists in the jobs table
      const jobCheck = await pool.query('SELECT job_id FROM jobs WHERE job_id = $1', [job_id]);
      if (jobCheck.rows.length === 0) {
        throw new ValidationError('Job ID does not exist');
      }
      updateValues.push(`job_id = $${paramIndex++}`);
      updateParams.push(job_id);
    }
    if (document_type !== undefined) {
      updateValues.push(`document_type = $${paramIndex++}`);
      updateParams.push(document_type);
    }
    if (file_path !== undefined) {
      updateValues.push(`file_path = $${paramIndex++}`);
      updateParams.push(file_path);
    }
    if (created_at !== undefined) {
      updateValues.push(`created_at = $${paramIndex++}`);
      updateParams.push(created_at);
    }

    if (updateValues.length === 0) {
      throw new ValidationError('No update fields provided');
    }

    updateQuery += updateValues.join(', ') + ` WHERE document_id = $${paramIndex} RETURNING *`;
    updateParams.push(id);

    const updatedDocument = await pool.query(updateQuery, updateParams);

    if (updatedDocument.rows.length === 0) {
      throw new NotFoundError('Document not found');
    }
    res.json(updatedDocument.rows[0]);
  } catch (err) {
    next(err);
  }
});

// DELETE a document
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleteDocument = await pool.query('DELETE FROM documents WHERE document_id = $1 RETURNING *', [id]);
    if (deleteDocument.rows.length === 0) {
      throw new NotFoundError('Document not found');
    }
    res.json({ msg: 'Document deleted', document: deleteDocument.rows[0] });
  } catch (err) {
    next(err);
  }
});

// POST send email for a document
router.post('/:id/send-email', async (req, res) => {
  const { id } = req.params;
  // You can optionally accept additional email sending options in the request body
  const emailOptions = req.body; 

  try {
    // Fetch document details
    const documentResult = await pool.query('SELECT * FROM documents WHERE document_id = $1', [id]);
    if (documentResult.rows.length === 0) {
      throw new NotFoundError('Document not found');
    }
    const document = documentResult.rows[0];

    // Fetch associated job and client details
    const jobResult = await pool.query('SELECT j.*, c.* FROM jobs j JOIN clients c ON j.client_id = c.client_id WHERE j.job_id = $1', [document.job_id]);
    if (jobResult.rows.length === 0) {
      throw new NotFoundError('Associated job or client not found');
    }
    const jobDetails = jobResult.rows[0]; // Contains both job and client info

    // Draft the email
    const emailDetails = await emailService.draftEmail(jobDetails, jobDetails, document); // Pass jobDetails as clientDetails for now, adjust as needed

    // Send the email
    await emailService.sendEmail(emailDetails);

    res.json({ msg: 'Email sent successfully' });
  } catch (err) {
    next(err);
  }
});
module.exports = router;