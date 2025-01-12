const express = require('express');
const { getAllUser } = require('../controllers/userController');
const {
  authentication,
  authorization,
} = require('../controllers/authController');

const router = express.Router();

router.get('/', authentication, authorization('0'), getAllUser);

module.exports = router;
