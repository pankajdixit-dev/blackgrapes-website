import express from 'express';
import { getMongoStatus } from '../config/db.js';

const router = express.Router();

router.get('/', (req, res) => {
  const mongoStatus = getMongoStatus();

  res.json({
    status: 'online',
    server: 'Black Grapes Softech REST API Engine',
    database: 'MongoDB',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    mongodb: mongoStatus
  });
});

export default router;
