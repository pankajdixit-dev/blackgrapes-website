import express from 'express';
import { uploadImage, uploadMiddleware } from '../controllers/uploadController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protectAdmin, uploadMiddleware.single('image'), uploadImage);

export default router;

