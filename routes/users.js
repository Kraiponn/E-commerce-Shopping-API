const express = require('express');
const { isAuth, isAdmin } = require('../middleware/auth');
const {
  getUser,
  getUsers
} = require('../controllers/users');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(isAuth, isAdmin('publisher', 'admin'), getUsers);

router
  .route('/:userId')
  .get(isAuth, isAdmin('admin'), getUser);


module.exports = router;
