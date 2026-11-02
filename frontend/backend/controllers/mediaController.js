import MediaItem from '../models/MediaItem.js';

export const getMediaList = async (req, res, next) => {
  try {
    const media = await MediaItem.find().sort({ createdAt: -1 });
    res.json({ success: true, count: media.length, data: media });
  } catch (error) {
    next(error);
  }
};

export const uploadMedia = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload an image file.' });
    }

    const host = req.get('host');
    const protocol = req.protocol;
    const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;

    const media = await MediaItem.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      url: fileUrl,
      uploadedBy: req.user?.name || 'Admin'
    });

    res.status(201).json({
      success: true,
      message: 'Media uploaded successfully',
      data: media
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMedia = async (req, res, next) => {
  try {
    const media = await MediaItem.findByIdAndDelete(req.params.id);
    if (!media) return res.status(404).json({ success: false, message: 'Media not found' });
    res.json({ success: true, message: 'Media deleted' });
  } catch (error) {
    next(error);
  }
};

