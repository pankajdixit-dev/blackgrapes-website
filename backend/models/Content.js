import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema(
  {
    sectionKey: {
      type: String,
      required: [true, 'Section identifier key is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Content = mongoose.models.Content || mongoose.model('Content', contentSchema);
export default Content;

