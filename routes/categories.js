const express = require('express');
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categories');

const { isAdmin, isAuth } = require('../middleware/auth');
const productRoute = require('./products');

const router = express.Router({ mergeParams: true });

// Re-route into other resource
router.use('/:categoryId/products', productRoute);

router
  .route('')
  .get(getCategories)
  .post(isAuth, isAdmin('publisher', 'admin'),createCategory);

router
  .route('/:id')
  .get(getCategory)
  .put(isAuth, isAdmin('publisher', 'admin'), updateCategory)
  .delete(isAuth, isAdmin('publisher', 'admin'), deleteCategory);

module.exports = router;