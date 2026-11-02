import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema(
  {
    adminName: {
      type: String,
      default: 'Admin'
    },
    adminEmail: {
      type: String,
      default: ''
    },
    action: {
      type: String,
      required: true
    },
    module: {
      type: String,
      required: true
    },
    details: {
      type: String,
      default: ''
    },
    ipAddress: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);
export default ActivityLog;
