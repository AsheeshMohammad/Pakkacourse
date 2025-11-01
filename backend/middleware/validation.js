import { body, validationResult } from 'express-validator';

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// Login validation rules
const validateLogin = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username is required and must be between 3-30 characters'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  validate
];

// Link validation rules
const validateLink = [
  body('linkname')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Linkname is required and must be between 1-100 characters'),
  body('link')
    .isURL({ protocols: ['http', 'https'] })
    .withMessage('Please provide a valid URL starting with http:// or https://'),
  body('linktype')
    .isIn(['course', 'resource', 'tutorial', 'documentation', 'other'])
    .withMessage('Linktype must be one of: course, resource, tutorial, documentation, other'),
  validate
];

// User registration validation rules
const validateUserRegistration = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3-30 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  validate
];

export {
  validateLogin,
  validateLink,
  validateUserRegistration,
  validate
};
