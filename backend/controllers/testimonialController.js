import Testimonial from '../models/Testimonial.js';

const initialTestimonialsSeed = [
  {
    name: 'Subodh Bhandari',
    role: 'Businessman',
    company: 'Enterprise Partner',
    rating: 5,
    quote: 'I have had the pleasure of working with Black Grapes Softech Company for the past few years, and I can confidently say that they have significantly transformed our business operations. Their software solutions have not only streamlined our processes but also boosted our efficiency and productivity to new heights.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    isPublished: true,
    order: 1,
  },
  {
    name: 'Kartik Mali',
    role: 'Gym Owner',
    company: 'Fitness Enterprise',
    rating: 5,
    quote: 'From the moment we engaged with Black Grapes Softech, their team demonstrated a deep understanding of our unique business needs. They took the time to listen to our challenges, goals, and aspirations and then tailored their software solutions to meet our specific requirements. The level of customization and flexibility they provided was truly impressive.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    isPublished: true,
    order: 2,
  }
];

let fallbackTestimonials = [...initialTestimonialsSeed.map((t, idx) => ({ ...t, _id: `testi-${idx + 1}` }))];

export const seedTestimonialsIfEmpty = async () => {
  try {
    const count = await Testimonial.countDocuments();
    if (count === 0) {
      await Testimonial.insertMany(initialTestimonialsSeed);
      console.log('🌱 [Seeder] Seeded default client testimonials.');
    }
  } catch {}
};

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
export const getTestimonials = async (req, res) => {
  try {
    const { all } = req.query;
    const filter = {};

    if (!all || all !== 'true') {
      filter.isPublished = true;
    }

    try {
      const testimonials = await Testimonial.find(filter).sort({ order: 1, createdAt: -1 });
      return res.json({ success: true, count: testimonials.length, data: testimonials });
    } catch {
      let results = [...fallbackTestimonials];
      if (!all || all !== 'true') {
        results = results.filter((t) => t.isPublished !== false);
      }
      return res.json({ success: true, count: results.length, data: results });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create review
// @route   POST /api/testimonials
// @access  Protected
export const createTestimonial = async (req, res) => {
  try {
    const { name, role, company, rating, quote, avatar, isPublished, order } = req.body;

    if (!name || !role || !quote) {
      return res.status(400).json({ success: false, message: 'Name, role, and quote are required.' });
    }

    const newTestimonialData = {
      name: name.trim(),
      role: role.trim(),
      company: company || '',
      rating: rating ? Number(rating) : 5,
      quote: quote.trim(),
      avatar: avatar || '',
      isPublished: isPublished !== undefined ? isPublished : true,
      order: order !== undefined ? Number(order) : 0,
    };

    let created = null;
    try {
      created = await Testimonial.create(newTestimonialData);
    } catch {
      created = { ...newTestimonialData, _id: `testi-${Date.now()}` };
      fallbackTestimonials.push(created);
    }

    res.status(201).json({ success: true, message: 'Testimonial created.', data: created });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update review
// @route   PUT /api/testimonials/:id
// @access  Protected
export const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    let updated = null;

    try {
      updated = await Testimonial.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (updated) {
        return res.json({ success: true, message: 'Testimonial updated.', data: updated });
      }
    } catch {}

    const index = fallbackTestimonials.findIndex((t) => t._id === id);
    if (index !== -1) {
      fallbackTestimonials[index] = { ...fallbackTestimonials[index], ...req.body };
      return res.json({ success: true, message: 'Testimonial updated.', data: fallbackTestimonials[index] });
    }

    return res.status(404).json({ success: false, message: 'Testimonial not found.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete review
// @route   DELETE /api/testimonials/:id
// @access  Protected
export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    try {
      const deleted = await Testimonial.findByIdAndDelete(id);
      if (deleted) {
        return res.json({ success: true, message: 'Testimonial deleted.' });
      }
    } catch {}

    const index = fallbackTestimonials.findIndex((t) => t._id === id);
    if (index !== -1) {
      fallbackTestimonials.splice(index, 1);
      return res.json({ success: true, message: 'Testimonial deleted.' });
    }

    return res.status(404).json({ success: false, message: 'Testimonial not found.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

