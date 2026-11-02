import jwt from 'jsonwebtoken';
import AdminUser from '../models/AdminUser.js';
import ActivityLog from '../models/ActivityLog.js';

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'blackgrapes_super_secure_jwt_secret_key_2026',
    { expiresIn: process.env.JWT_EXPIRE || '30d' }
  );
};

// @desc    Login Admin User
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password'
      });
    }

    const user = await AdminUser.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. User not found.'
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'This admin account has been deactivated.'
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Password incorrect.'
      });
    }

    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    // Log Activity
    await ActivityLog.create({
      adminName: user.name,
      adminEmail: user.email,
      action: 'LOGIN',
      module: 'AUTH',
      details: 'Admin logged in successfully',
      ipAddress: req.ip || ''
    }).catch(() => {});

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Current Logged in Admin
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const user = await AdminUser.findById(req.user.id);
    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await AdminUser.findById(req.user.id);

    if (name) user.name = name;
    if (email) user.email = email.toLowerCase();

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Change Password
// @route   PUT /api/auth/change-password
// @access  Private
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both current and new password'
      });
    }

    const user = await AdminUser.findById(req.user.id).select('+password');
    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password does not match'
      });
    }

    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    List All Admin Users
// @route   GET /api/auth/users
// @access  Private (Superadmin/Admin)
export const getAdminUsers = async (req, res, next) => {
  try {
    const users = await AdminUser.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create Admin User
// @route   POST /api/auth/users
// @access  Private (Superadmin)
export const createAdminUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await AdminUser.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'An admin user with this email already exists'
      });
    }

    const user = await AdminUser.create({
      name,
      email: email.toLowerCase(),
      password,
      role: role || 'admin'
    });

    res.status(201).json({
      success: true,
      message: 'Admin user created successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Admin User Role or Active Status
// @route   PUT /api/auth/users/:id
// @access  Private (Superadmin)
export const updateAdminUser = async (req, res, next) => {
  try {
    const { role, isActive, name } = req.body;
    const user = await AdminUser.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'Admin user not found' });
    }

    if (role) user.role = role;
    if (typeof isActive === 'boolean') user.isActive = isActive;
    if (name) user.name = name;

    await user.save();

    res.json({
      success: true,
      message: 'Admin user updated successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete Admin User
// @route   DELETE /api/auth/users/:id
// @access  Private (Superadmin)
export const deleteAdminUser = async (req, res, next) => {
  try {
    if (String(req.user._id) === String(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own admin account.'
      });
    }

    const user = await AdminUser.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Admin user not found' });
    }

    res.json({
      success: true,
      message: 'Admin user deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

