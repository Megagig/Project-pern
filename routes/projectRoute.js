const express = require('express');
const { createProject } = require('../controllers/projectController');
const {
  authentication,
  authorization,
} = require('../controllers/authController');

const router = express.Router();

router.post('/', authentication, authorization('0', '1'), createProject);

module.exports = router;
