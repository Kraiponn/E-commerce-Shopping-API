const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("express-async-handler");
const Category = require("../models/Categories");

// @desc    Get all categories
// @route   GET /api/v1/categories
// @access  Public
exports.getCategories = asyncHandler(async (req, res, next) => {
  const category = await Category.find();
  res.status(200).json({
    success: true,
    data: category || "Category on the table is empty"
  });
});

// @desc    Get single category
// @route   GET /api/v1/categories/:categoryId
// @access  Public
exports.getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.categoryId);

  if (!category) {
    return next(
      new ErrorResponse(
        `Category not found with id of ${req.params.catetoryId}`,
        400
      )
    );
  }

  res.status(200).json({
    success: true,
    data: category
  });
});

// @desc    Create new category
// @route   POST /api/v1/categories
// @access  Private
exports.createCategory = asyncHandler(async (req, res, next) => {
  // Added user to category.body
  req.body.user = req.user.id;

  // Check publisher category
  const publishedCategory = await Category.findOne({ user: req.user.id });

  // If user is not an admin. They can only add one category
  if (publishedCategory && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `The user with id of ${req.user.id} has already publisher category`,
        400
      )
    );
  }

  const category = await Category.create(req.body);

  res.status(201).json({
    success: true,
    data: category
  });
});

// @desc    Update category : category owner or admin
// @route   PUT /api/v1/categories/:categoryId
// @access  Private
exports.updateCategory = asyncHandler(async (req, res, next) => {
  let category = await Category.findById(req.params.categoryId);

  if (!category) {
    return next(
      new ErrorResponse(
        `Category not found with id of ${req.params.categoryId}`,
        400
      )
    );
  }

  // Check a user is category owner
  if (category.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.categoryId} is not authorized to update category`,
        401
      )
    );
  }

  category = await Category.findByIdAndUpdate(
    req.params.categoryId,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(201).json({
    success: true,
    data: category
  });
});
