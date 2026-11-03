import mongoose from 'mongoose';
import SiteSettings from '../models/SiteSettings.js';
import { safeRecordActivity } from '../utils/activityLogger.js';
import { getStoredSettings, saveStoredSettings } from '../utils/siteStore.js';

// @desc    Get Site Settings (Singleton)
// @route   GET /api/settings
// @access  Public
export const getSettings = async (req, res, next) => {
  try {
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      const settings = await SiteSettings.findOne().maxTimeMS(1000).lean();
      if (settings) {
        saveStoredSettings(settings);
        return res.json({ success: true, data: settings });
      }
    }
  } catch (error) {}

  const stored = getStoredSettings();
  res.json({ success: true, data: stored });
};

// @desc    Update Site Settings
// @route   PUT /api/settings
// @access  Private (Admin)
export const updateSettings = async (req, res, next) => {
  try {
    const current = getStoredSettings();
    const updated = {
      ...current,
      ...req.body,
      lastUpdatedBy: req.user?.name || req.user?.email || 'Admin',
      updatedAt: new Date().toISOString()
    };

    // Save to local file store immediately
    saveStoredSettings(updated);

    // Save to MongoDB if connected
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      try {
        await SiteSettings.findOneAndUpdate({}, updated, { upsert: true, new: true }).maxTimeMS(1500);
      } catch (err) {}
    }

    safeRecordActivity({
      adminName: req.user?.name || 'Admin',
      adminEmail: req.user?.email || '',
      action: 'UPDATE',
      module: 'SETTINGS',
      details: 'Updated global site settings',
      ipAddress: req.ip || ''
    });

    res.json({
      success: true,
      message: 'Site settings updated successfully',
      data: updated
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
