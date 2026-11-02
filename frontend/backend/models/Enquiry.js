import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    ticketId: {
      type: String,
      unique: true,
      index: true
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true
    },
    company: {
      type: String,
      trim: true,
      default: ''
    },
    service: {
      type: String,
      trim: true,
      default: 'General Inquiry'
    },
    subject: {
      type: String,
      trim: true,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    budget: {
      type: String,
      default: ''
    },
    timeline: {
      type: String,
      default: ''
    },
    source: {
      type: String,
      default: 'website'
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'In Progress', 'Resolved', 'Closed'],
      default: 'New',
      index: true
    },
    notes: {
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

// Auto-generate ticketId if not provided
enquirySchema.pre('save', function (next) {
  if (!this.ticketId) {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    this.ticketId = `BG-${randomDigits}`;
  }
  next();
});

const Enquiry = mongoose.model('Enquiry', enquirySchema);
export default Enquiry;
