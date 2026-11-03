import mongoose from 'mongoose';
import ActivityLog from '../models/ActivityLog.js';

/**
 * Safe non-blocking activity logger
 * Never blocks the Express request loop and only records if MongoDB is connected.
 */
export const safeRecordActivity = (data) => {
  try {
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      ActivityLog.create({
        adminName: data.adminName || 'Admin',
        adminEmail: data.adminEmail || 'admin@blackgrapessoftech.com',
        action: data.action || 'UPDATE',
        module: data.module || 'SYSTEM',
        details: data.details || '',
        ipAddress: data.ipAddress || ''
      }).catch(() => {});
    }
  } catch (e) {
    // Silently continue without blocking user workflow
  }
};

export default safeRecordActivity;
