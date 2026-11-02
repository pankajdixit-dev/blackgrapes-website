import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { cloudinary, isCloudinaryConfigured } from '../config/cloudinary.js';

// Setup local uploads storage directory
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer Storage Configuration (Disk for local, Memory for Cloudinary)
const storage = isCloudinaryConfigured
  ? multer.memoryStorage()
  : multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, uploadsDir);
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, `bg-${uniqueSuffix}${ext}`);
      },
    });

// File Filter (Images Only)
const fileFilter = (req, file, cb) => {
  const allowedExtensions = /jpeg|jpg|png|webp|svg/;
  const extname = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedExtensions.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files (.jpg, .jpeg, .png, .webp, .svg) are allowed!'));
  }
};

export const uploadMiddleware = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter,
});

// @desc    Upload single image
// @route   POST /api/upload
// @access  Protected
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please select an image file to upload.' });
    }

    // 1. Cloudinary upload if configured
    if (isCloudinaryConfigured && req.file.buffer) {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'blackgrapes',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) {
            return res.status(500).json({ success: false, message: error.message });
          }
          return res.json({
            success: true,
            message: 'Image uploaded successfully to Cloudinary.',
            url: result.secure_url,
            public_id: result.public_id,
          });
        }
      );
      uploadStream.end(req.file.buffer);
      return;
    }

    // 2. Local disk upload URL fallback
    const localUrl = `/uploads/${req.file.filename}`;
    return res.json({
      success: true,
      message: 'Image uploaded successfully to server storage.',
      url: localUrl,
      filename: req.file.filename,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

