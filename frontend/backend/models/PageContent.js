import mongoose from 'mongoose';

const pageContentSchema = new mongoose.Schema(
  {
    pageSlug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      default: 'about'
    },
    sections: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    revisions: {
      type: [mongoose.Schema.Types.Mixed],
      default: []
    },
    lastUpdatedBy: {
      type: String,
      default: 'Admin'
    }
  },
  {
    timestamps: true
  }
);

const PageContent = mongoose.model('PageContent', pageContentSchema);
export default PageContent;
