import express from 'express';
import {
  getAllPagesSummary,
  getPageContent,
  savePageContent,
  publishSectionContent,
  addPageSection,
  deletePageSection,
  duplicatePageSection,
  reorderPageSections,
  toggleSectionVisibility
} from '../controllers/contentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public: Get all pages summary
router.get('/all-pages', getAllPagesSummary);

// Public: Get page sections
router.get('/:pageSlug', getPageContent);

// Private (Admin): Save draft / all sections
router.put('/:pageSlug', protect, savePageContent);

// Private (Admin): Publish single or all sections
router.post('/:pageSlug/publish', protect, publishSectionContent);

// Private (Admin): Add new custom section
router.post('/:pageSlug/section', protect, addPageSection);

// Private (Admin): Delete section
router.delete('/:pageSlug/section/:sectionKey', protect, deletePageSection);

// Private (Admin): Duplicate section
router.post('/:pageSlug/duplicate/:sectionKey', protect, duplicatePageSection);

// Private (Admin): Reorder sections
router.post('/:pageSlug/reorder', protect, reorderPageSections);

// Private (Admin): Toggle visibility (show/hide)
router.post('/:pageSlug/visibility/:sectionKey', protect, toggleSectionVisibility);

export default router;
