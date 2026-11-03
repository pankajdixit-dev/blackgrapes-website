import mongoose from 'mongoose';
import Testimonial from '../models/Testimonial.js';
import { safeRecordActivity } from '../utils/activityLogger.js';
import { getStoredTestimonials, saveStoredTestimonials } from '../utils/siteStore.js';

export const getTestimonials = async (req, res, next) => {
  try {
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      const testimonials = await Testimonial.find().maxTimeMS(1000).sort({ order: 1, createdAt: -1 }).lean();
      if (testimonials && testimonials.length > 0) {
        saveStoredTestimonials(testimonials);
        return res.json({ success: true, count: testimonials.length, data: testimonials });
      }
    }
  } catch (error) {}

  const stored = getStoredTestimonials();
  res.json({ success: true, count: stored.length, data: stored });
};

export const createTestimonial = async (req, res, next) => {
  try {
    const list = getStoredTestimonials();
    const newTestimonial = {
      ...req.body,
      id: req.body.id || `test_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    list.push(newTestimonial);
    saveStoredTestimonials(list);

    if (mongoose.connection && mongoose.connection.readyState === 1) {
      try {
        await Testimonial.create(newTestimonial);
      } catch (e) {}
    }

    safeRecordActivity({
      adminName: req.user?.name || 'Admin',
      adminEmail: req.user?.email || '',
      action: 'CREATE',
      module: 'TESTIMONIAL',
      details: `Created testimonial by: ${newTestimonial.name || newTestimonial.author}`
    });

    res.status(201).json({ success: true, message: 'Testimonial created', data: newTestimonial });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTestimonial = async (req, res, next) => {
  try {
    const list = getStoredTestimonials();
    const id = req.params.id;
    const index = list.findIndex((t) => t.id === id || t._id === id);

    let updated;
    if (index >= 0) {
      list[index] = { ...list[index], ...req.body, updatedAt: new Date().toISOString() };
      updated = list[index];
    } else {
      updated = { ...req.body, id, updatedAt: new Date().toISOString() };
      list.push(updated);
    }
    saveStoredTestimonials(list);

    if (mongoose.connection && mongoose.connection.readyState === 1) {
      try {
        await Testimonial.findByIdAndUpdate(id, req.body, { new: true }).maxTimeMS(1500);
      } catch (e) {}
    }

    safeRecordActivity({
      adminName: req.user?.name || 'Admin',
      adminEmail: req.user?.email || '',
      action: 'UPDATE',
      module: 'TESTIMONIAL',
      details: `Updated testimonial for: ${updated.name || updated.author || id}`
    });

    res.json({ success: true, message: 'Testimonial updated', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTestimonial = async (req, res, next) => {
  try {
    const id = req.params.id;
    const list = getStoredTestimonials().filter((t) => t.id !== id && t._id !== id);
    saveStoredTestimonials(list);

    if (mongoose.connection && mongoose.connection.readyState === 1) {
      try {
        await Testimonial.findByIdAndDelete(id).maxTimeMS(1500);
      } catch (e) {}
    }

    safeRecordActivity({
      adminName: req.user?.name || 'Admin',
      adminEmail: req.user?.email || '',
      action: 'DELETE',
      module: 'TESTIMONIAL',
      details: `Deleted testimonial ${id}`
    });

    res.json({ success: true, message: 'Testimonial deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
