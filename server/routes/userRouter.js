const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');

router.post('/add',
  userController.bcryptPassword,
  userController.addNewUser,
  (req, res) => {
    res.status(200).json('Successfully added new user');
  });

router.post('/login',
  userController.loginCheck,
  (req, res) => res.status(200).json('Successfully logged in'));

module.exports = router;
