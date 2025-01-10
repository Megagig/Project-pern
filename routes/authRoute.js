const express = require('express');
const { signup } = require('../controllers/authController.js');

const router = express.Router();

router.post('/sign-up', signup);

module.exports = router;
