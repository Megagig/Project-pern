const express = require('express');
const { createProject } = require('../controllers/projectController');
const { authentication } = require('../controllers/authController');

const router = express.Router();

router.post('/', authentication, createProject);

module.exports = router;
