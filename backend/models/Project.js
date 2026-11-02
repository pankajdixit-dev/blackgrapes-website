import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    client: {
      type: String,
      default: ''
    },
    industry: {
      type: String,
      default: ''
    },
    duration: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      required: [true, 'Project description is required']
    },
    challenge: {
      type: String,
      default: ''
    },
    solution: {
      type: String,
      default: ''
    },
    results: {
      type: String,
      default: ''
    },
    technologies: {
      type: [String],
      default: []
    },
    image: {
      type: String,
      default: ''
    },
    liveUrl: {
      type: String,
      default: ''
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    order: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Project = mongoose.model('Project', projectSchema);
export default Project;
