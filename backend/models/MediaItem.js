import mongoose from 'mongoose';

const mediaItemSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true
    },
    originalName: {
      type: String,
      required: true
    },
    mimeType: {
      type: String,
      default: 'image/jpeg'
    },
    size: {
      type: Number,
      default: 0
    },
    url: {
      type: String,
      required: true
    },
    uploadedBy: {
      type: String,
      default: 'Admin'
    }
  },
  {
    timestamps: true
  }
);

const MediaItem = mongoose.model('MediaItem', mediaItemSchema);
export default MediaItem;

