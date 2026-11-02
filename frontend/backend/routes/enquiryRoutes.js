import express from 'express';
import {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry,
  getEnquiryStats
} from '../controllers/enquiryController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public: Submit enquiry / lead
router.post('/', createEnquiry);

// Private: Admin dashboard views & management
router.get('/', protect, getEnquiries);
router.get('/stats', protect, getEnquiryStats);
router.get('/:id', protect, getEnquiryById);
router.put('/:id', protect, updateEnquiryStatus);
router.delete('/:id', protect, deleteEnquiry);

export default router;

