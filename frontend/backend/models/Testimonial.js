import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true
    },
    designation: {
      type: String,
      default: ''
    },
    company: {
      type: String,
      default: ''
    },
    review: {
      type: String,
      required: [true, 'Review text is required']
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5
    },
    avatar: {
      type: String,
      default: ''
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    order: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Testimonial = mongoose.model('Testimonial', testimonialSchema);
export default Testimonial;
