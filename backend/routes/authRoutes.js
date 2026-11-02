import express from 'express';
import {
  login,
  getMe,
  updateProfile,
  changePassword,
  getAdminUsers,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser
} from '../controllers/authController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public auth
router.post('/login', login);

// Private profile
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);

// Superadmin user management
router.get('/users', protect, authorize('superadmin', 'admin'), getAdminUsers);
router.post('/users', protect, authorize('superadmin'), createAdminUser);
router.put('/users/:id', protect, authorize('superadmin'), updateAdminUser);
router.delete('/users/:id', protect, authorize('superadmin'), deleteAdminUser);

export default router;

