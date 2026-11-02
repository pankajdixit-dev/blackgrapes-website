import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Team member name is required'],
      trim: true
    },
    designation: {
      type: String,
      required: [true, 'Designation is required'],
      trim: true
    },
    department: {
      type: String,
      default: 'Engineering'
    },
    bio: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    linkedin: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    },
    order: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);
export default TeamMember;

