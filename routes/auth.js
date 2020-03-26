const express = require('express');
const { isAuth } = require('../middleware/auth');

const {
  login,
  register,
  forgotPassword,
  resetPassword,
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

router.post('/forgotpassword', forgotPassword);

router.put('/resetpassword/:resetToken', resetPassword);

module.exports = router;