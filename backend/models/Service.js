import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    category: {
      type: String,
      default: 'software'
    },
    tagline: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      required: [true, 'Service description is required']
    },
    detailedDescription: {
      type: String,
      default: ''
    },
    deliverables: {
      type: [String],
      default: []
    },
    tags: {
      type: [String],
      default: []
    },
    icon: {
      type: String,
      default: 'Code'
    },
    url: {
      type: String,
      default: ''
    },
    order: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Service = mongoose.model('Service', serviceSchema);
export default Service;

