const express = require('express');
const { isAuth } = require('../middleware/auth');

const {
  login,
  register,
  forgotPassword,
  updateDetails,
  updatePassword,
  resetPassword,
  getMe
} = require('../controllers/auth');

const router = express.Router({ mergeParams: true });


router.route('/login').post(login);

router.route('/register').post(register);

router.get('/', isAuth, getMe);

router.put('/updatedetails', isAuth, updateDetails);

router.put('/updatepassword', isAuth, updatePassword);

router.post('/forgotpassword', forgotPassword);

router.put('/resetpassword/:resetToken', resetPassword);

module.exports = router;