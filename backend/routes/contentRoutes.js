import express from 'express';
import {
  getPageContent,
  savePageContent,
  publishSectionContent
} from '../controllers/contentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public: Get page sections
router.get('/:pageSlug', getPageContent);

// Private (Admin): Save draft / all sections
router.put('/:pageSlug', protect, savePageContent);

// Private (Admin): Publish single section
router.post('/:pageSlug/publish', protect, publishSectionContent);

export default router;
