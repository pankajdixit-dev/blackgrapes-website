import ActivityLog from '../models/ActivityLog.js';

export const getLogs = async (req, res, next) => {
  try {
    const { limit = 50, module } = req.query;
    const query = {};
    if (module) query.module = module;

    const logs = await ActivityLog.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit));

    res.json({ success: true, count: logs.length, data: logs });
  } catch (error) {
    next(error);
  }
};

export const createLog = async (req, res, next) => {
  try {
    const log = await ActivityLog.create({
      ...req.body,
      adminName: req.user?.name || req.body.adminName || 'Admin',
      adminEmail: req.user?.email || req.body.adminEmail || '',
      ipAddress: req.ip || ''
    });
    res.status(201).json({ success: true, data: log });
  } catch (error) {
    next(error);
  }
};

