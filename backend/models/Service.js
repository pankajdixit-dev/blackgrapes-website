import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true,
    },
    tagline: {
      type: String,
      trim: true,
      default: '',
    },
    category: {
      type: String,
      required: [true, 'Service category is required'],
      lowercase: true,
      trim: true,
    },
    categoryLabel: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      required: [true, 'Service description is required'],
    },
    keyDeliverables: {
      type: [String],
      default: [],
    },
    techStack: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: '',
    },
    accentColor: {
      type: String,
      default: '#ff6b00',
    },
    badge: {
      type: String,
      default: '',
    },
    timeline: {
      type: String,
      default: '',
    },
    clientTypes: {
      type: String,
      default: '',
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

serviceSchema.index({ category: 1, isActive: 1, order: 1 });

const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);
export default Service;

