const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");


// @desc    Get single user by id
// @route   GET /api/v1/users/:userId
// @access  Private
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
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
// @route   GET /api/v1/users
// @access  Public
exports.getUsers = asyncHandler(async (req, res, next) => {
  const user = await User.find();

  if (!user) {
    return next(new ErrorResponse(`User not found`, 404));
  }

  res.status(200).json({
    success: true,
    count: user.length,
    data: user
  });
});

// @desc    Create user
// @route   POST /api/v1/users
// @access  Public
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user
  });
});

// @desc    Update user
// @route   PUT /api/v1/users/:userId
// @access  Public
exports.updateaUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.userId,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Delete user
// @route   POST /api/v1/users
// @access  Public
exports.deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.userId);

  res.status(201).json({
    success: true,
    data: {}
  });
});