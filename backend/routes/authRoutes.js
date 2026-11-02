import express from 'express';
import { loginAdmin, getMe, changePassword, logoutAdmin } from '../controllers/authController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.get('/me', protectAdmin, getMe);
router.put('/change-password', protectAdmin, changePassword);
router.post('/logout', protectAdmin, logoutAdmin);

export default router;

