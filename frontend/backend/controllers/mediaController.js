import fs from 'fs';
import path from 'path';
import MediaItem from '../models/MediaItem.js';
import PageContent from '../models/PageContent.js';
import Service from '../models/Service.js';
import Project from '../models/Project.js';
import TeamMember from '../models/TeamMember.js';
import SiteSettings from '../models/SiteSettings.js';
import {
  isCloudinaryReady,
  uploadToCloudinary,
  deleteFromCloudinary
} from '../config/cloudinary.js';

// @desc    Get all uploaded media assets
// @route   GET /api/media
// @access  Public
export const getMediaList = async (req, res, next) => {
  try {
    const { type, page } = req.query;
    const filter = {};
    if (type && ['image', 'video'].includes(type)) {
      filter.resourceType = type;
    }
    if (page) {
      filter.assignedPage = page;
    }

    const media = await MediaItem.find(filter).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: media.length,
      cloudinaryActive: isCloudinaryReady(),
      data: media
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload media (Image or Video) to Cloudinary or fallback storage
// @route   POST /api/media/upload
// @access  Private (Admin)
export const uploadMedia = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please select an image or video file to upload.'
      });
    }

    const isVideo = req.file.mimetype.startsWith('video/');
    const resourceType = isVideo ? 'video' : 'image';
    let fileUrl = '';
    let publicId = null;
    let format = path.extname(req.file.originalname).replace('.', '').toLowerCase();
    let width = 0;
    let height = 0;
    let duration = 0;
    let storageProvider = 'local';

    if (isCloudinaryReady()) {
      try {
        const cloudResult = await uploadToCloudinary(req.file.path, {
          resourceType,
          folder: 'blackgrapes_media'
        });

        fileUrl = cloudResult.secure_url;
        publicId = cloudResult.public_id;
        format = cloudResult.format || format;
        width = cloudResult.width || 0;
        height = cloudResult.height || 0;
        duration = cloudResult.duration || 0;
        storageProvider = 'cloudinary';

        // Delete temporary file from local disk after successful cloud upload
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
      } catch (cloudErr) {
        console.error('[Cloudinary Upload Error]', cloudErr.message);
        // Fallback to local file URL if Cloudinary call fails
        const host = req.get('host');
        const protocol = req.protocol;
        fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
      }
    } else {
      // Local server disk serving
      const host = req.get('host');
      const protocol = req.protocol;
      fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
    }

    const media = await MediaItem.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      url: fileUrl,
      publicId,
      resourceType,
      format,
      width,
      height,
      duration,
      assignedPage: req.body.assignedPage || '',
      assignedSection: req.body.assignedSection || '',
      uploadedBy: req.user?.name || 'Admin'
    });

    res.status(201).json({
      success: true,
      message: `${resourceType === 'video' ? 'Video' : 'Image'} uploaded successfully (${storageProvider})`,
      storageProvider,
      data: media
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Check whether a media asset is currently used in any page/content
// @route   GET /api/media/check-usage/:id
// @access  Private (Admin)
export const checkMediaUsage = async (req, res, next) => {
  try {
    const media = await MediaItem.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ success: false, message: 'Media item not found' });
    }

    const usage = [];
    const mediaUrl = media.url;
    const mediaName = media.filename;

    // Search PageContent
    const pages = await PageContent.find();
    pages.forEach((p) => {
      const pageStr = JSON.stringify(p.sections || {});
      if (pageStr.includes(mediaUrl) || (media.publicId && pageStr.includes(media.publicId))) {
        usage.push({ type: 'Page', title: `Page: ${p.pageSlug}` });
      }
    });

    // Search Services
    const services = await Service.find({
      $or: [{ icon: mediaUrl }, { image: mediaUrl }, { icon: mediaName }]
    });
    services.forEach((s) => usage.push({ type: 'Service', title: `Service: ${s.title}` }));

    // Search Projects
    const projects = await Project.find({
      $or: [{ image: mediaUrl }, { banner: mediaUrl }, { image: mediaName }]
    });
    projects.forEach((pr) => usage.push({ type: 'Project', title: `Project: ${pr.title}` }));

    // Search Team Members
    const team = await TeamMember.find({
      $or: [{ avatar: mediaUrl }, { avatar: mediaName }]
    });
    team.forEach((t) => usage.push({ type: 'Team', title: `Team Member: ${t.name}` }));

    res.json({
      success: true,
      inUse: usage.length > 0,
      usageCount: usage.length,
      usedIn: usage
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Assign media to a specific page and section
// @route   PUT /api/media/:id/assign
// @access  Private (Admin)
export const assignMedia = async (req, res, next) => {
  try {
    const { assignedPage, assignedSection } = req.body;
    const media = await MediaItem.findByIdAndUpdate(
      req.params.id,
      { assignedPage: assignedPage || '', assignedSection: assignedSection || '' },
      { new: true }
    );

    if (!media) {
      return res.status(404).json({ success: false, message: 'Media asset not found' });
    }

    res.json({
      success: true,
      message: 'Media assignment updated successfully',
      data: media
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete media from Cloudinary and MongoDB
// @route   DELETE /api/media/:id
// @access  Private (Admin)
export const deleteMedia = async (req, res, next) => {
  try {
    const media = await MediaItem.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ success: false, message: 'Media asset not found' });
    }

    // Delete from Cloudinary if public ID exists
    if (media.publicId && isCloudinaryReady()) {
      try {
        await deleteFromCloudinary(media.publicId, media.resourceType);
      } catch (cloudErr) {
        console.warn('[Cloudinary Delete Warning]', cloudErr.message);
      }
    }

    // Delete local file if it exists
    if (media.filename) {
      const localPath = path.join(process.cwd(), 'backend', 'uploads', media.filename);
      if (fs.existsSync(localPath)) {
        try {
          fs.unlinkSync(localPath);
        } catch (_) {}
      }
    }

    await MediaItem.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Media asset deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
