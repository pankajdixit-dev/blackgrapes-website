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
    publicId: {
      type: String,
      default: null,
      index: true
    },
    resourceType: {
      type: String,
      enum: ['image', 'video'],
      default: 'image'
    },
    format: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 0
    },
    assignedPage: {
      type: String,
      default: ''
    },
    assignedSection: {
      type: String,
      default: ''
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
