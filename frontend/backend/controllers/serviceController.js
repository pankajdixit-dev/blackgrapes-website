import mongoose from 'mongoose';
import Service from '../models/Service.js';
import ActivityLog from '../models/ActivityLog.js';
import { DEFAULT_SERVICES } from '../defaultData.js';

// @desc    Get All Services
// @route   GET /api/services
// @access  Public
export const getServices = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({
        success: true,
        count: DEFAULT_SERVICES.length,
        data: DEFAULT_SERVICES,
        fallback: true
      });
    }

    const { category, search, activeOnly } = req.query;
    const query = {};

    if (activeOnly !== 'false') {
      query.isActive = true;
    }

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const services = await Service.find(query).maxTimeMS(2000).sort({ order: 1, createdAt: 1 });

    res.json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (error) {
    res.json({
      success: true,
      count: DEFAULT_SERVICES.length,
      data: DEFAULT_SERVICES,
      fallback: true
    });
  }
};

// @desc    Get Service by Slug
// @route   GET /api/services/:slug
// @access  Public
export const getServiceBySlug = async (req, res, next) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

// @desc    Create New Service
// @route   POST /api/services
// @access  Private (Admin)
export const createService = async (req, res, next) => {
  try {
    const service = await Service.create(req.body);

    await ActivityLog.create({
      adminName: req.user?.name || 'Admin',
      adminEmail: req.user?.email || '',
      action: 'CREATE',
      module: 'SERVICE',
      details: `Created service: ${service.title}`,
      ipAddress: req.ip || ''
    }).catch(() => {});

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: service
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Service
// @route   PUT /api/services/:id
// @access  Private (Admin)
export const updateService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    await ActivityLog.create({
      adminName: req.user?.name || 'Admin',
      adminEmail: req.user?.email || '',
      action: 'UPDATE',
      module: 'SERVICE',
      details: `Updated service: ${service.title}`,
      ipAddress: req.ip || ''
    }).catch(() => {});

    res.json({
      success: true,
      message: 'Service updated successfully',
      data: service
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete Service
// @route   DELETE /api/services/:id
// @access  Private (Admin)
export const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    await ActivityLog.create({
      adminName: req.user?.name || 'Admin',
      adminEmail: req.user?.email || '',
      action: 'DELETE',
      module: 'SERVICE',
      details: `Deleted service: ${service.title}`,
      ipAddress: req.ip || ''
    }).catch(() => {});

    res.json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

