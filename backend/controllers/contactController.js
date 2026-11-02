import Contact from '../models/Contact.js';

// Fallback in-memory leads storage for offline/testing robustness
let fallbackContacts = [];

// @desc    Submit new contact inquiry / lead
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req, res) => {
  try {
    const { name, email, phone, company, service, urgency, message, source } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.',
      });
    }

    const ticketId = `BG-${Math.floor(100000 + Math.random() * 900000)}`;

    const newLeadData = {
      ticketId,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: (phone || 'Not provided').trim(),
      company: (company || '').trim(),
      service: service || 'General Inquiry',
      urgency: urgency || 'Normal',
      message: message.trim(),
      source: source || 'Website Contact Form',
      status: 'New',
      createdAt: new Date(),
    };

    let savedLead = null;
    try {
      savedLead = await Contact.create(newLeadData);
    } catch (dbErr) {
      console.warn('MongoDB not ready for Contact.create, using resilient store:', dbErr.message);
      savedLead = { ...newLeadData, _id: `local-${Date.now()}` };
      fallbackContacts.unshift(savedLead);
    }

    console.log(`📥 [Lead Received] Ticket #${ticketId} from ${name} (${email})`);

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your enquiry has been received by Black Grapes Group.',
      ticketId,
      data: savedLead,
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process enquiry. Please try again.',
      error: error.message,
    });
  }
};

// @desc    Get all inquiries with search, filter, pagination
// @route   GET /api/contact
// @access  Protected
export const getContacts = async (req, res) => {
  try {
    const { status, search, source, page = 1, limit = 20 } = req.query;

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 20;
    const skip = (pageNum - 1) * limitNum;

    const filter = {};

    if (status && status !== 'all') {
      filter.status = status;
    }

    if (source && source !== 'all') {
      filter.source = source;
    }

    if (search) {
      const q = search.trim();
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
        { phone: { $regex: q, $options: 'i' } },
        { ticketId: { $regex: q, $options: 'i' } },
        { service: { $regex: q, $options: 'i' } },
        { company: { $regex: q, $options: 'i' } },
      ];
    }

    try {
      const total = await Contact.countDocuments(filter);
      const contacts = await Contact.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum);

      return res.json({
        success: true,
        count: contacts.length,
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum) || 1,
        data: contacts,
      });
    } catch (dbErr) {
      // Memory fallback
      let results = [...fallbackContacts];
      if (status && status !== 'all') {
        results = results.filter((c) => c.status === status);
      }
      if (search) {
        const q = search.toLowerCase();
        results = results.filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.email.toLowerCase().includes(q) ||
            c.ticketId.toLowerCase().includes(q)
        );
      }
      return res.json({
        success: true,
        count: results.length,
        total: results.length,
        page: 1,
        pages: 1,
        data: results,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single inquiry details
// @route   GET /api/contact/:id
// @access  Protected
export const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    let contact = null;

    try {
      contact = await Contact.findById(id);
    } catch {
      contact = fallbackContacts.find((c) => c._id === id || c.ticketId === id);
    }

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update inquiry status & admin notes
// @route   PUT /api/contact/:id
// @access  Protected
export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    let contact = null;
    try {
      contact = await Contact.findById(id);
      if (contact) {
        if (status) contact.status = status;
        if (adminNotes !== undefined) contact.adminNotes = adminNotes;
        await contact.save();
        return res.json({ success: true, message: 'Status updated.', data: contact });
      }
    } catch {}

    // Fallback search
    const local = fallbackContacts.find((c) => c._id === id || c.ticketId === id);
    if (local) {
      if (status) local.status = status;
      if (adminNotes !== undefined) local.adminNotes = adminNotes;
      return res.json({ success: true, message: 'Status updated.', data: local });
    }

    return res.status(404).json({ success: false, message: 'Enquiry not found.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete inquiry
// @route   DELETE /api/contact/:id
// @access  Protected
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    try {
      const deleted = await Contact.findByIdAndDelete(id);
      if (deleted) {
        return res.json({ success: true, message: 'Enquiry deleted successfully.' });
      }
    } catch {}

    const index = fallbackContacts.findIndex((c) => c._id === id || c.ticketId === id);
    if (index !== -1) {
      fallbackContacts.splice(index, 1);
      return res.json({ success: true, message: 'Enquiry deleted successfully.' });
    }

    return res.status(404).json({ success: false, message: 'Enquiry not found.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

