import SiteSettings from '../models/SiteSettings.js';
import ActivityLog from '../models/ActivityLog.js';

// Default initial settings
const DEFAULT_SETTINGS = {
  companyName: 'Black Grapes Softech',
  brandTagline: 'Innovate. Integrate. Elevate.',
  primaryPhone: '+917470997884',
  secondaryPhone: '+916262414463',
  primaryEmail: 'contact@blackgrapessoftech.com',
  supportEmail: 'info@blackgrapessoftech.com',
  headquartersAddress: 'Indore, Madhya Pradesh, India',
  googleMapsUrl: 'https://maps.google.com/?q=Indore',
  socialLinks: {
    linkedin: 'https://www.linkedin.com/company/black-grapes-softech',
    twitter: 'https://twitter.com/blackgrapes',
    instagram: 'https://www.instagram.com/blackgrapessoftech',
    facebook: 'https://www.facebook.com/blackgrapessoftech',
    youtube: 'https://youtube.com',
    github: 'https://github.com/pankajdixit-dev'
  },
  seoTitle: 'Black Grapes Softech - Custom Software & Enterprise Solutions',
  seoDescription: 'Enterprise custom software engineering, Android/iOS apps, CRMs, and web platforms built with precision.',
  seoKeywords: ['software development', 'IT solutions', 'mobile apps', 'Indore', 'enterprise software'],
  headerNoticeText: '10+ Years of Proven IT Excellence • Indore, India',
  footerCopyright: '© 2026 Black Grapes Softech. All rights reserved.'
};

// @desc    Get Site Settings (Singleton)
// @route   GET /api/settings
// @access  Public
export const getSettings = async (req, res, next) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create(DEFAULT_SETTINGS);
    }
    res.json({ success: true, data: settings });
  } catch (error) {
    // If DB is offline, return default settings
    res.json({ success: true, data: DEFAULT_SETTINGS, fallback: true });
  }
};

// @desc    Update Site Settings
// @route   PUT /api/settings
// @access  Private (Admin)
export const updateSettings = async (req, res, next) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings(DEFAULT_SETTINGS);
    }

    Object.assign(settings, req.body);
    settings.lastUpdatedBy = req.user?.name || 'Admin';
    await settings.save();

    await ActivityLog.create({
      adminName: req.user?.name || 'Admin',
      adminEmail: req.user?.email || '',
      action: 'UPDATE',
      module: 'SETTINGS',
      details: 'Updated global site settings',
      ipAddress: req.ip || ''
    }).catch(() => {});

    res.json({
      success: true,
      message: 'Site settings updated successfully',
      data: settings
    });
  } catch (error) {
    next(error);
  }
};
