const express = require('express');
const {
  getUser,
  getUsers,
  createUser,
  updateaUser,
  deleteUser
} = require('../controllers/users');

const router = express.Router({ mergeParams: true });

const { isAdmin, isAuth } = require('../middleware/auth');

router.use(isAuth);
router.use(isAdmin("admin"));

router
  .route('/')
  .get(getUsers)
  .post(createUser);

router
  .route('/:userId')
  .get(getUser)
  .put(updateaUser)
  .delete(deleteUser);


module.exports = router;
