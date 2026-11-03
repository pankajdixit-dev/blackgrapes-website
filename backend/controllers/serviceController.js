import mongoose from 'mongoose';
import Service from '../models/Service.js';
import { safeRecordActivity } from '../utils/activityLogger.js';
import { getStoredServices, saveStoredServices } from '../utils/siteStore.js';

// @desc    Get All Services
// @route   GET /api/services
// @access  Public
export const getServices = async (req, res, next) => {
  try {
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      const { category, search, activeOnly } = req.query;
      const query = {};
      if (activeOnly !== 'false') query.isActive = true;
      if (category && category !== 'all') query.category = category;
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }

      const services = await Service.find(query).maxTimeMS(1000).sort({ order: 1, createdAt: 1 }).lean();
      if (services && services.length > 0) {
        saveStoredServices(services);
        return res.json({ success: true, count: services.length, data: services });
      }
    }
  } catch (error) {}

  const stored = getStoredServices();
  res.json({ success: true, count: stored.length, data: stored });
};

// @desc    Get Service by Slug
// @route   GET /api/services/:slug
// @access  Public
export const getServiceBySlug = async (req, res, next) => {
  const stored = getStoredServices();
  const service = stored.find((s) => s.slug === req.params.slug || s.id === req.params.slug);
  if (!service) {
    return res.status(404).json({ success: false, message: 'Service not found' });
  }
  res.json({ success: true, data: service });
};

// @desc    Create New Service
// @route   POST /api/services
// @access  Private (Admin)
export const createService = async (req, res, next) => {
  try {
    const list = getStoredServices();
    const newService = {
      ...req.body,
      id: req.body.id || `srv_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    list.push(newService);
    saveStoredServices(list);

    if (mongoose.connection && mongoose.connection.readyState === 1) {
      try {
        await Service.create(newService);
      } catch (e) {}
    }

    safeRecordActivity({
      adminName: req.user?.name || 'Admin',
      adminEmail: req.user?.email || '',
      action: 'CREATE',
      module: 'SERVICE',
      details: `Created service: ${newService.title}`,
      ipAddress: req.ip || ''
    });

    res.status(201).json({ success: true, message: 'Service created successfully', data: newService });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update Service
// @route   PUT /api/services/:id
// @access  Private (Admin)
export const updateService = async (req, res, next) => {
  try {
    const list = getStoredServices();
    const id = req.params.id;
    const index = list.findIndex((s) => s.id === id || s._id === id);

    let updatedService;
    if (index >= 0) {
      list[index] = { ...list[index], ...req.body, updatedAt: new Date().toISOString() };
      updatedService = list[index];
    } else {
      updatedService = { ...req.body, id, updatedAt: new Date().toISOString() };
      list.push(updatedService);
    }
    saveStoredServices(list);

    if (mongoose.connection && mongoose.connection.readyState === 1) {
      try {
        await Service.findByIdAndUpdate(id, req.body, { new: true, runValidators: false }).maxTimeMS(1500);
      } catch (e) {}
    }

    safeRecordActivity({
      adminName: req.user?.name || 'Admin',
      adminEmail: req.user?.email || '',
      action: 'UPDATE',
      module: 'SERVICE',
      details: `Updated service: ${updatedService.title || id}`,
      ipAddress: req.ip || ''
    });

    res.json({ success: true, message: 'Service updated successfully', data: updatedService });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete Service
// @route   DELETE /api/services/:id
// @access  Private (Admin)
export const deleteService = async (req, res, next) => {
  try {
    const id = req.params.id;
    const list = getStoredServices().filter((s) => s.id !== id && s._id !== id);
    saveStoredServices(list);

    if (mongoose.connection && mongoose.connection.readyState === 1) {
      try {
        await Service.findByIdAndDelete(id).maxTimeMS(1500);
      } catch (e) {}
    }

    safeRecordActivity({
      adminName: req.user?.name || 'Admin',
      adminEmail: req.user?.email || '',
      action: 'DELETE',
      module: 'SERVICE',
      details: `Deleted service ${id}`,
      ipAddress: req.ip || ''
    });

    res.json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
