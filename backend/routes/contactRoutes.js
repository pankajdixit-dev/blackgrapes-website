import express from 'express';
import {
  submitContact,
  getContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
} from '../controllers/contactController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public lead submission
router.post('/', submitContact);

// Protected admin lead management
router.get('/', protectAdmin, getContacts);
router.get('/:id', protectAdmin, getContactById);
router.put('/:id', protectAdmin, updateContactStatus);
router.delete('/:id', protectAdmin, deleteContact);

export default router;

