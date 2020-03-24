const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');


// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE + 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if(process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token
    });
};


// @desc    Register new user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role
  });

  sendTokenResponse(user, 201, res);
});


// @desc    Logged in user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email and password
  if(!email || !password) {
    return next(
      new ErrorResponse('Please provide an email and password', 400)
    );
  }

  // Check user logged in by email
  const user = await User.findOne({ email }).select('+password');

  if(!user) {
    return next(
      new ErrorResponse('Invalid credentials', 401)
    );
  }

  // Check match password
  const isMatch = await user.matchPassword(password);

  if(!isMatch) {
    return next(
      new ErrorResponse('Invalid credentials', 401)
    );
  }

  sendTokenResponse(user, 200, res);
});

// @desc    Get single user by id
// @route   GET /api/v1/auth/:userId
// @access  Public
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.userId);

  if(!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.userId}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Get all user
// @route   GET /api/v1/auth
// @access  Public
exports.getUsers = asyncHandler(async (req, res, next) => {
  const user = await User.find();

  if(!user) {
    return next(
      new ErrorResponse(`User not found`, 404)
    );
  }

  res.status(200).json({
    success: true,
    count: user.length,
    data: user
  });
});