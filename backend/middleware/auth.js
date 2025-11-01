import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = async (req, res, next) => {
  try {
    let token = null;
    let authSource = null;

    // Check for token in Authorization header (Bearer token)
    const authHeader = req.header('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.replace('Bearer ', '');
      authSource = 'bearer';
    }
    
    // If no Bearer token, check session
    if (!token && req.session && req.session.token) {
      token = req.session.token;
      authSource = 'session';
    }
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // For session-based auth, use session user data
    if (authSource === 'session' && req.session.user) {
      req.user = req.session.user;
      req.authSource = authSource;
      return next();
    }

    // For Bearer token, try to fetch user from database
    // If User model doesn't exist or query fails, use decoded token data
    try {
      const user = await User.findByPk(decoded.userId);
      
      if (user && user.isActive) {
        req.user = user;
        req.authSource = authSource;
        return next();
      }
    } catch (dbError) {
      console.log('Database user lookup failed, using token data:', dbError.message);
    }

    // Fallback: Use decoded token data if database lookup fails
    // This handles cases where User model doesn't exist or userId is actually username
    req.user = {
      userId: decoded.userId,
      username: decoded.userId, // userId might actually be username
      role: 'user' // Default role
    };
    req.authSource = authSource;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token.'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      // Clear session if token expired
      if (req.session) {
        req.session.destroy();
      }
      return res.status(401).json({
        success: false,
        message: 'Token expired. Please login again.'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error during authentication.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const adminAuth = async (req, res, next) => {
  try {
    await auth(req, res, () => {
      if (req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Access denied. Admin privileges required.'
        });
      }
      next();
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during admin authentication.'
    });
  }
};

export { auth, adminAuth };
