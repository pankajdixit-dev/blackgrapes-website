import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
      default: '',
    },
    category: {
      type: String,
      required: [true, 'Project category is required'],
      trim: true,
    },
    clientName: {
      type: String,
      trim: true,
      default: 'Confidential Client',
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
    },
    image: {
      type: String,
      default: '',
    },
    projectUrl: {
      type: String,
      default: '',
    },
    tags: {
      type: [String],
      default: [],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

projectSchema.index({ isFeatured: 1, order: 1 });

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
export default Project;

