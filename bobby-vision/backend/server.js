const express = require('express');
const app = express();
const port = 3001;
const jobsRouter = require('/home/user/studio/bobby-vision/backend/routes/jobs');
const clientsRouter = require('/home/user/studio/bobby-vision/backend/routes/clients');
const documentsRouter = require('/home/user/studio/bobby-vision/backend/routes/documents');
const serviceLibraryRouter = require('/home/user/studio/bobby-vision/backend/routes/serviceLibrary');
const materialsRouter = require('/home/user/studio/bobby-vision/backend/routes/materials');
const intelligenceRouter = require('/home/user/studio/bobby-vision/backend/routes/intelligence');
const { ApiError } = require('/home/user/studio/bobby-vision/backend/utils/errors');
const authRouter = require('/home/user/studio/bobby-vision/backend/routes/auth');
const externalApiRouter = require('/home/user/studio/bobby-vision/backend/routes/externalApi');
const authenticateToken = require('/home/user/studio/bobby-vision/backend/middleware/authMiddleware');

app.get('/', (req, res) => {
  res.send('Bobby-Vision Backend is running!');
});

app.use('/api', clientsRouter);
app.use('/api', jobsRouter);
app.use('/api', documentsRouter);
app.use('/api', serviceLibraryRouter);
app.use('/api', materialsRouter);
app.use('/api', intelligenceRouter);
app.use('/api', externalApiRouter);

// Publicly accessible routes (e.g., login)
app.use('/api', authRouter); 
// Protected routes - apply authentication middleware
app.use('/api', authenticateToken, clientsRouter, jobsRouter, documentsRouter, serviceLibraryRouter, materialsRouter, intelligenceRouter, externalApiRouter);

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
