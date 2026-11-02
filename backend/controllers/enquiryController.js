import Enquiry from '../models/Enquiry.js';
import ActivityLog from '../models/ActivityLog.js';

// @desc    Submit New Enquiry / Lead
// @route   POST /api/enquiries
// @access  Public
export const createEnquiry = async (req, res, next) => {
  try {
    const { name, email, phone, company, service, subject, message, budget, timeline, source } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and phone number are required.'
      });
    }

    const enquiry = await Enquiry.create({
      name,
      email,
      phone,
      company: company || '',
      service: service || 'General Inquiry',
      subject: subject || '',
      message: message || '',
      budget: budget || '',
      timeline: timeline || '',
      source: source || 'website',
      ipAddress: req.ip || ''
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your enquiry has been received. Our team will contact you shortly.',
      ticketId: enquiry.ticketId,
      data: enquiry
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get All Enquiries
// @route   GET /api/enquiries
// @access  Private (Admin)
export const getEnquiries = async (req, res, next) => {
  try {
    const { status, search, limit = 50, page = 1 } = req.query;
    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { ticketId: { $regex: search, $options: 'i' } },
        { service: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Enquiry.countDocuments(query);
    const enquiries = await Enquiry.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({
      success: true,
      count: enquiries.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: enquiries
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Single Enquiry
// @route   GET /api/enquiries/:id
// @access  Private (Admin)
export const getEnquiryById = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    res.json({ success: true, data: enquiry });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Enquiry Status / Notes
// @route   PUT /api/enquiries/:id
// @access  Private (Admin)
export const updateEnquiryStatus = async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    if (status) enquiry.status = status;
    if (typeof notes === 'string') enquiry.notes = notes;

    await enquiry.save();

    res.json({
      success: true,
      message: 'Enquiry updated successfully',
      data: enquiry
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete Enquiry
// @route   DELETE /api/enquiries/:id
// @access  Private (Admin)
export const deleteEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    await ActivityLog.create({
      adminName: req.user?.name || 'Admin',
      adminEmail: req.user?.email || '',
      action: 'DELETE',
      module: 'ENQUIRY',
      details: `Deleted enquiry #${enquiry.ticketId} from ${enquiry.name}`,
      ipAddress: req.ip || ''
    }).catch(() => {});

    res.json({
      success: true,
      message: 'Enquiry deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Enquiry Stats Overview
// @route   GET /api/enquiries/stats
// @access  Private (Admin)
export const getEnquiryStats = async (req, res, next) => {
  try {
    const total = await Enquiry.countDocuments();
    const newCount = await Enquiry.countDocuments({ status: 'New' });
    const inProgress = await Enquiry.countDocuments({ status: 'In Progress' });
    const resolved = await Enquiry.countDocuments({ status: 'Resolved' });
    const closed = await Enquiry.countDocuments({ status: 'Closed' });

    res.json({
      success: true,
      data: {
        total,
        new: newCount,
        inProgress,
        resolved,
        closed
      }
    });
  } catch (error) {
    next(error);
  }
};
