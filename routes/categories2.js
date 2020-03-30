const express = require('express');
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categories');

const { isAuth, isAdmin } = require('../middleware/auth');


const router = express.Router({  mergeParams: true });

const productRoute = require('./products');


// router.use(':/categoryId/products', productRoute);


/* router 
  .route('/')
  .get(getCategories)
  .post(isAuth, createCategory);

router
  .route('/:id')
  .get(getCategory)
  .put(isAuth, updateCategory)
  .delete(isAuth, deleteCategory); */


module.exports = router;