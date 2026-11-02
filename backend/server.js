import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRouter from './apiRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Serve static uploaded files
const uploadsPath = path.resolve(__dirname, '../public/uploads');
app.use('/uploads', express.static(uploadsPath));

// Mount REST API
app.use('/api', apiRouter);

// Fallback health check
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    name: 'Black Grapes Softech Backend Server',
    endpoints: {
      health: '/api/health',
      allContent: '/api/all-content',
      inquiries: '/api/inquiries'
    }
  });
});

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 Black Grapes Softech Backend Server RUNNING!`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`📁 Database: ${path.resolve(__dirname, 'data/db.json')}`);
  console.log(`======================================================\n`);
});
