const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");
const Category = require('../models/Category');

// @desc    Get all products
// @route   GET /api/v1/products
// @route   GET /api/v1/categories/:categoryId/products
// @access  Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  let product;
  if(req.params.categoryId) {
    product = await Product.find({ category: req.params.categoryId });
  } else {
    product = await Product.find();
  }

  res.status(200).json({
    success: true,
    count: product.length,
    data: product
  });
});

// @desc    Get single product
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if(!product) {
    return next(
      new ErrorResponse(
        `Product not found with id of ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: product
  });
});

// @desc    Create product
// @route   POST /api/v1/products
// @route   POST /api/v1/categories/:categoryId/products
// @access  Public
exports.addProduct = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  req.body.category = req.params.categoryId;

  let category = await Category.findById(req.params.categoryId);
  if(!category){
    return next(
      new ErrorResponse(
        `No category with the id of ${req.params.categoryId}`,
        400
      )
    );
  }

  // Make sure user is category owner
  if(category.user.toString() !== req.user.id && req.user.role !== 'admin'){
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to add a product to category ${req.params.categoryId}`,
        400
      )
    );
  }

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    data: product
  });
});

// @desc    Update product
// @route   PUT /api/v1/products/:id
// @access  Public
exports.updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if(!product){
    return next(
      new ErrorResponse(
        `No product with the id of ${req.params.id}`,
        404
      )
    );
  }

  // Make sure user is product owner
  if(product.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update product ${req.params.id}`,
        400
      )
    );
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: product
  });
});

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
// @access  Public
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if(!product){
    return next(
      new ErrorResponse(
        `No product with the id of ${req.params.id}`,
        404
      )
    );
  }

  // Make sure user is product owner
  if(product.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete product ${req.params.id}`,
        400
      )
    );
  }

  await product.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});