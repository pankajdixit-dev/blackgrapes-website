import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const protectAdmin = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'blackgrapes_super_secure_jwt_secret_key_2026_indore_xyz987654321'
      );

      // Try finding in DB
      let admin = null;
      try {
        admin = await Admin.findById(decoded.id).select('-password');
      } catch {
        // DB might be in fallback mode
      }

      // If DB admin found or if token is verified with fallback payload
      if (admin) {
        req.admin = admin;
      } else if (decoded && decoded.email) {
        req.admin = {
          _id: decoded.id,
          name: decoded.name || 'Admin',
          email: decoded.email,
          role: decoded.role || 'admin',
        };
      } else {
        return res.status(401).json({ success: false, message: 'Admin account not found or deactivated' });
      }

      next();
    } catch (error) {
      console.error('Auth verification failed:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Not authorized: Token has expired or is invalid',
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized: No authentication token provided',
    });
  }
};

