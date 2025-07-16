const express = require('express');
const app = express();
const port = 3001;
const jobsRouter = require('./routes/jobs');
const clientsRouter = require('./routes/clients');
const documentsRouter = require('./routes/documents');
const serviceLibraryRouter = require('./routes/serviceLibrary');
const materialsRouter = require('./routes/materials');
const intelligenceRouter = require('./routes/intelligence');
const { ApiError } = require('./utils/errors');
const authRouter = require('./routes/auth');
const externalApiRouter = require('./routes/externalApi');
const { authenticateToken, authorize } = require('./middleware/authMiddleware');

app.get('/', (req, res) => {
  res.send('Bobby-Vision Backend is running!');
});

// Publicly accessible routes (e.g., login)
app.use('/api', authRouter);

// Protected routes
app.use('/api/clients', authenticateToken, authorize(['bobby']), clientsRouter);
app.use('/api/jobs', authenticateToken, authorize(['bobby']), jobsRouter);
app.use('/api/documents', authenticateToken, documentsRouter);
app.use('/api/services', authenticateToken, serviceLibraryRouter);
app.use('/api/materials', authenticateToken, materialsRouter);
app.use('/api/intelligence', authenticateToken, intelligenceRouter);
app.use('/api/external', authenticateToken, externalApiRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err); // Log the error for debugging
  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const message = err instanceof ApiError ? err.message : 'Internal Server Error';

  res.status(statusCode).json({ error: message });
});

app.listen(port, () => {
  console.log(`Bobby-Vision backend listening on port ${port}`);
});

module.exports = app;
