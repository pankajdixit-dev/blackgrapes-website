import express from 'express';
import cors from 'cors';
import path from 'path';
import apiRouter from './apiRouter.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Static uploads directory
app.use('/uploads', express.static(path.resolve(process.cwd(), 'public/uploads')));

// Mount the Black Grapes Softech Complete CMS & Lead API
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`🚀 Black Grapes Softech Persistent Backend API running at http://localhost:${PORT}`);
  console.log(`📁 Database: backend/data/db.json`);
});
