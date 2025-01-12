const express = require('express');
const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
} = require('../controllers/projectController');
const {
  authentication,
  authorization,
} = require('../controllers/authController');

const router = express.Router();

router.post('/', authentication, authorization('0', '1'), createProject);
router.get('/', authentication, getAllProjects);
router.get('/:id', authentication, getProjectById);
router.patch('/:id', authentication, authorization('0', '1'), updateProject);

module.exports = router;
