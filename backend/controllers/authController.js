import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Generate JWT token
const generateToken = (userId) => {
  // eslint-disable-next-line no-undef
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    // eslint-disable-next-line no-undef
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  });
};

// Login user
const login = async (req, res) => {
  try {
    console.log('Login request body:', req.body);
    console.log('Login request headers:', req.headers);
    const { username, password } = req.body;

    // Check if request body is empty or missing required fields
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    // Call the stored procedure for login
    const { getSequelize } = await import('../config/database.js');
    const sequelize = getSequelize();
    
    const results = await sequelize.query(
      'CALL "PC_UserLogin"($1, $2, null, null)',
      {
        bind: [username, password],
        type: sequelize.QueryTypes.SELECT
      }
    );

    // Check if login was successful
    if (results && results.length > 0) {
      const userData = results[0];
      if (userData.result_message && userData.result_message.includes('Login successful')) {
        // Generate token
        const token = generateToken(username);

        // Store token in session
        req.session.token = token;
        req.session.user = {
          username: username,
          role: userData.user_role
        };

        res.status(200).json({
          success: true,
          message: 'Login successful',
          data: {
            user: {
              username: username,
              role: userData.user_role
            },
            token
          }
        });
      } else {
        return res.status(401).json({
          success: false,
          message: 'Invalid username or password'
        });
      }
    } else {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

// Register user (optional endpoint)
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const { Op } = await import('sequelize');
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }]
      }
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or username already exists'
      });
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      password
    });

    // Generate token
    const token = generateToken(user.id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        },
        token
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
};

// Get current user profile
const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        user: req.user
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile'
    });
  }
};

// Logout user
const logout = async (req, res) => {
  try {
    // Destroy session
    req.session.destroy((err) => {
      if (err) {
        console.error('Session destruction error:', err);
        return res.status(500).json({
          success: false,
          message: 'Error during logout'
        });
      }

      // Clear cookie
      res.clearCookie('connect.sid');
      
      res.status(200).json({
        success: true,
        message: 'Logout successful'
      });
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during logout'
    });
  }
};

export {
  login,
  register,
  getProfile,
  logout
};
