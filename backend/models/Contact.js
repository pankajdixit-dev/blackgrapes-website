import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    ticketId: {
      type: String,
      unique: true,
      required: true,
      default: () => `BG-${Math.floor(100000 + Math.random() * 900000)}`,
    },
    name: {
      type: String,
      required: [true, 'Contact name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Contact email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    company: {
      type: String,
      trim: true,
      default: '',
    },
    service: {
      type: String,
      trim: true,
      default: 'General Inquiry',
    },
    urgency: {
      type: String,
      enum: ['Immediate', 'Normal', 'Planning', 'Immediate (< 1 week)', 'Normal (2 - 4 weeks)', 'Planning (1 - 3 months)'],
      default: 'Normal',
    },
    message: {
      type: String,
      required: [true, 'Message content is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['New', 'In Progress', 'Completed', 'Archived'],
      default: 'New',
    },
    source: {
      type: String,
      default: 'Website Contact Form',
    },
    adminNotes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Indexing for rapid queries in Admin Panel
contactSchema.index({ status: 1, createdAt: -1 });
contactSchema.index({ email: 1, phone: 1 });

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
export default Contact;

