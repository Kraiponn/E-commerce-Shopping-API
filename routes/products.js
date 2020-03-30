const express = require('express');
const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/products');

const { isAuth, isAdmin} = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(isAuth, getProducts)
  .post(isAuth, isAdmin('publisher', 'admin'), addProduct);

router
  .route('/:id')
  .get(isAuth, getProduct)
  .put(isAuth, isAdmin('publisher', 'admin'), updateProduct)
  .delete(isAuth, isAdmin('publisher', 'admin'), deleteProduct);

module.exports = router;
