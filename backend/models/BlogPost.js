import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    summary: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      required: [true, 'Blog content is required']
    },
    author: {
      type: String,
      default: 'Black Grapes Team'
    },
    category: {
      type: String,
      default: 'Technology'
    },
    coverImage: {
      type: String,
      default: ''
    },
    tags: {
      type: [String],
      default: []
    },
    isPublished: {
      type: Boolean,
      default: true
    },
    publishedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

const BlogPost = mongoose.model('BlogPost', blogPostSchema);
export default BlogPost;

