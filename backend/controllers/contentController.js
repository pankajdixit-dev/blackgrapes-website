import Content from '../models/Content.js';

const initialContentSeed = {
  hero: {
    badge: '🍇 Welcome to Black Grapes Group',
    title: 'Where Technology, Engineering & Strategic Advisory Converge',
    subtitle: 'A premier Indian conglomerate empowering enterprises with bespoke software platforms, bank-empaneled asset valuations, statutory municipal sanctions, and prime commercial investments.',
    ctaPrimaryText: 'Explore All Services',
    ctaPrimaryLink: '/services',
    ctaSecondaryText: 'Schedule Strategy Call',
  },
  stats: [
    { value: '15+', label: 'Years Industry Leadership' },
    { value: '1,200+', label: 'Delivered Projects & Reports' },
    { value: '50+', label: 'Engineers & Registered Valuers' },
    { value: '99.4%', label: 'Client Satisfaction Rating' },
  ],
  contactInfo: {
    address1: '252-F/H, Scheme No 54, Vijay Nagar, Indore-452010, Madhya Pradesh.',
    address2: 'Office No.1141, Scheme No.114, Part-1, Vijay Nagar, Indore-452010, Madhya Pradesh.',
    phone1: '+91 9039397884',
    phone2: '+91 7470997884',
    phone3: '+91 6262414463',
    primaryEmail: 'blackgrapesgroups@gmail.com',
    secondaryEmail: 'blackgrapes.arpitjain@gmail.com',
  }
};

let fallbackContentStore = { ...initialContentSeed };

export const seedContentIfEmpty = async () => {
  try {
    for (const [key, val] of Object.entries(initialContentSeed)) {
      const existing = await Content.findOne({ sectionKey: key });
      if (!existing) {
        await Content.create({ sectionKey: key, data: val });
      }
    }
    console.log('🌱 [Seeder] Seeded default website dynamic sections.');
  } catch {}
};

// @desc    Get dynamic content for a section
// @route   GET /api/content/:section
// @access  Public
export const getContentBySection = async (req, res) => {
  try {
    const { section } = req.params;
    const key = section.toLowerCase().trim();

    try {
      const item = await Content.findOne({ sectionKey: key });
      if (item) {
        return res.json({ success: true, section: key, data: item.data });
      }
    } catch {}

    if (fallbackContentStore[key]) {
      return res.json({ success: true, section: key, data: fallbackContentStore[key] });
    }

    return res.status(404).json({ success: false, message: `Section '${key}' not found.` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update dynamic content for a section
// @route   PUT /api/content/:section
// @access  Protected
export const updateContentBySection = async (req, res) => {
  try {
    const { section } = req.params;
    const key = section.toLowerCase().trim();
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({ success: false, message: 'Content data object is required.' });
    }

    try {
      const updated = await Content.findOneAndUpdate(
        { sectionKey: key },
        { data },
        { new: true, upsert: true }
      );
      return res.json({ success: true, message: `Section '${key}' updated.`, data: updated.data });
    } catch {}

    fallbackContentStore[key] = data;
    return res.json({ success: true, message: `Section '${key}' updated.`, data: fallbackContentStore[key] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

