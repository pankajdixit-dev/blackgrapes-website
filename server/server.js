import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRouter from '../backend/apiRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Static uploads directory
app.use('/uploads', express.static(path.resolve(__dirname, '../public/uploads')));

// Mount the Black Grapes Softech Complete CMS & Lead API
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`🚀 Black Grapes Softech Persistent Backend API running at http://localhost:${PORT}`);
  console.log(`📁 Database: backend/data/db.json`);
});
