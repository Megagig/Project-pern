const express = require('express');
const { signup, login } = require('../controllers/authController.js');

const router = express.Router();

router.post('/sign-up', signup);
router.post('/login', login);

module.exports = router;
