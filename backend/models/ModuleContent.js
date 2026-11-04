import mongoose from 'mongoose';

const moduleContentSchema = new mongoose.Schema(
  {
    module: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    updated_at: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    minimize: false // Preserve empty objects or properties
  }
);

const ModuleContent = mongoose.models.ModuleContent || mongoose.model('ModuleContent', moduleContentSchema);
export default ModuleContent;

