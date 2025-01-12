const express = require('express');
const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const {
  authentication,
  authorization,
} = require('../controllers/authController');

const router = express.Router();

router.post('/', authentication, authorization('0', '1'), createProject);
router.get('/', authentication, authorization('0', '1'), getAllProjects);
router.get('/:id', authentication, authorization('0', '1'), getProjectById);
router.patch('/:id', authentication, authorization('0', '1'), updateProject);
router.delete('/:id', authentication, authorization('0', '1'), deleteProject);

module.exports = router;
