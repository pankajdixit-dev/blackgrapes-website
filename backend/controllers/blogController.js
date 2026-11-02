import BlogPost from '../models/BlogPost.js';

export const getBlogs = async (req, res, next) => {
  try {
    const { category, tag } = req.query;
    const query = { isPublished: true };
    if (category) query.category = category;
    if (tag) query.tags = tag;

    const blogs = await BlogPost.find(query).sort({ publishedAt: -1 });
    res.json({ success: true, count: blogs.length, data: blogs });
  } catch (error) {
    next(error);
  }
};

export const getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await BlogPost.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ success: false, message: 'Blog post not found' });
    res.json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

export const createBlog = async (req, res, next) => {
  try {
    const blog = await BlogPost.create(req.body);
    res.status(201).json({ success: true, message: 'Blog published successfully', data: blog });
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const blog = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, message: 'Blog updated', data: blog });
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await BlogPost.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, message: 'Blog deleted' });
  } catch (error) {
    next(error);
  }
};
