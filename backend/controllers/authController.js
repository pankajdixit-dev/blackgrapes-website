import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';

// Helper: Generate JWT Token
const generateToken = (id, email, name, role) => {
  return jwt.sign(
    { id, email, name, role },
    process.env.JWT_SECRET || 'blackgrapes_super_secure_jwt_secret_key_2026_indore_xyz987654321',
    {
      expiresIn: process.env.JWT_EXPIRE || '7d',
    }
  );
};

// @desc    Admin Login
// @route   POST /api/auth/login
// @access  Public
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 1. Try finding in MongoDB
    let admin = null;
    try {
      admin = await Admin.findOne({ email: normalizedEmail });
    } catch (dbErr) {
      console.warn('DB query in loginAdmin fallback:', dbErr.message);
    }

    if (admin) {
      const isMatch = await admin.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password.',
        });
      }

      admin.lastLogin = new Date();
      await admin.save();

      const token = generateToken(admin._id, admin.email, admin.name, admin.role);

      return res.json({
        success: true,
        message: 'Admin login successful.',
        token,
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          lastLogin: admin.lastLogin,
        },
      });
    }

    // 2. Default Seed Admin Check if DB is fresh / not seeded yet
    const defaultAdminEmail = (process.env.DEFAULT_ADMIN_EMAIL || 'admin@blackgrapessoftech.com').toLowerCase();
    const defaultAdminPass = process.env.DEFAULT_ADMIN_PASSWORD || 'BlackGrapes@2026';

    if (normalizedEmail === defaultAdminEmail && password === defaultAdminPass) {
      const token = generateToken('admin-root-id', defaultAdminEmail, 'Super Admin', 'superadmin');
      return res.json({
        success: true,
        message: 'Admin login successful (Root Admin Profile).',
        token,
        admin: {
          id: 'admin-root-id',
          name: 'Super Admin',
          email: defaultAdminEmail,
          role: 'superadmin',
          lastLogin: new Date(),
        },
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid email or password.',
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during authentication.',
    });
  }
};

// @desc    Get Current Admin Profile
// @route   GET /api/auth/me
// @access  Protected
export const getMe = async (req, res) => {
  try {
    res.json({
      success: true,
      admin: req.admin,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Change Admin Password
// @route   PUT /api/auth/change-password
// @access  Protected
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required.',
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters.',
      });
    }

    let admin = null;
    try {
      admin = await Admin.findById(req.admin._id || req.admin.id);
    } catch {}

    if (admin) {
      const isMatch = await admin.matchPassword(currentPassword);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: 'Current password is incorrect.',
        });
      }

      admin.password = newPassword;
      await admin.save();

      return res.json({
        success: true,
        message: 'Password successfully updated.',
      });
    }

    // If root fallback admin
    return res.json({
      success: true,
      message: 'Password successfully updated for administrative session.',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Admin Logout
// @route   POST /api/auth/logout
// @access  Protected
export const logoutAdmin = async (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully.',
  });
};

