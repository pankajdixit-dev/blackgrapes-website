import express from 'express';
import { getDashboardStats, getRecentActivity } from '../controllers/dashboardController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/stats', protectAdmin, getDashboardStats);
router.get('/recent-activity', protectAdmin, getRecentActivity);

export default router;

