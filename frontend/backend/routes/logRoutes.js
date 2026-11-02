import express from 'express';
import { getLogs, createLog } from '../controllers/logController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, authorize('superadmin', 'admin'), getLogs);
router.post('/', protect, createLog);

export default router;

