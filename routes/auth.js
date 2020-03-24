const express = require('express');
const { isAuth } = require('../middleware/auth');

const {
  login,
  register,
  getUser,
  getUsers
} = require('../controllers/auth');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getUsers);

router
  .route('/:userId')
  .get(isAuth, getUser);

router
  .route('/login')
  .post(login);

router
  .route('/register')
  .post(register);

module.exports = router;