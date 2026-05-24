import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 8000;

// Environment-aware URL configuration
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

const MONGODB_URI = 'mongodb://localhost:27017/octofit_db';

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Basic routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running', baseUrl });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Base URL: ${baseUrl}`);
});
