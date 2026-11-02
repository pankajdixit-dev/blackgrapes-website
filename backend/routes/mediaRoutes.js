import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import {
  getMediaList,
  uploadMedia,
  deleteMedia,
  assignMedia,
  checkMediaUsage
} from '../controllers/mediaController.js';
import { protect } from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '../uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer disk storage for receiving upload before streaming to Cloudinary or local serving
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    cb(null, `${base}-${Date.now()}${ext}`);
  }
});

// File filter (Images and Videos allowed)
const fileFilter = (req, file, cb) => {
  const isImage = file.mimetype.startsWith('image/');
  const isVideo = file.mimetype.startsWith('video/');

  if (isImage || isVideo) {
    cb(null, true);
  } else {
    cb(new Error('Only image (JPEG, PNG, WEBP, GIF, SVG) and video files (MP4, WEBM, MOV) are allowed!'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

const router = express.Router();

router.get('/', getMediaList);
router.get('/check-usage/:id', protect, checkMediaUsage);
router.post('/upload', protect, upload.single('file'), uploadMedia);
router.put('/:id/assign', protect, assignMedia);
router.delete('/:id', protect, deleteMedia);

export default router;
