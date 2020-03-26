const express = require('express');
const { isAuth } = require('../middleware/auth');

const {
  login,
  register,
  updateDetails,
  updatePassword,
  forgotpassword,
  resetPassword,
  getUser,
  getUsers
} = require('../controllers/auth');

const router = express.Router({ mergeParams: true });


router.route('/login').post(login);

router.route('/register').post(register);

router.put('/updatedetails', isAuth, updateDetails);

router.put('/updatepassword', isAuth, updatePassword);

router.post('/forgotpassword', forgotpassword);

router.put('/resetpassword/:resetToken', resetPassword);


module.exports = router;