import mongoose from 'mongoose';
import Testimonial from '../models/Testimonial.js';
import ActivityLog from '../models/ActivityLog.js';
import { DEFAULT_TESTIMONIALS } from '../defaultData.js';

export const getTestimonials = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ success: true, count: DEFAULT_TESTIMONIALS.length, data: DEFAULT_TESTIMONIALS, fallback: true });
    }
    const testimonials = await Testimonial.find().maxTimeMS(2000).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: testimonials.length, data: testimonials });
  } catch (error) {
    res.json({ success: true, count: DEFAULT_TESTIMONIALS.length, data: DEFAULT_TESTIMONIALS, fallback: true });
  }
};

export const createTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({ success: true, message: 'Testimonial created', data: testimonial });
  } catch (error) {
    next(error);
  }
};

export const updateTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!testimonial) return res.status(404).json({ success: false, message: 'Testimonial not found' });
    res.json({ success: true, message: 'Testimonial updated', data: testimonial });
  } catch (error) {
    next(error);
  }
};

export const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) return res.status(404).json({ success: false, message: 'Testimonial not found' });
    res.json({ success: true, message: 'Testimonial deleted' });
  } catch (error) {
    next(error);
  }
};

