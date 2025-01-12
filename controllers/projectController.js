const project = require('../db/models/project');
const catchAsync = require('../utils/catchAsync');

const createProject = catchAsync(async (req, res) => {
  const body = req.body;
  const userId = req.user.id;

  const newProject = await project.create({
    title: body.title,
    productImage: body.productImage,
    price: body.price,
    shortDescription: body.shortDescription,
    description: body.description,
    productUrl: body.productUrl,
    category: body.category,
    tags: body.tags,
    createdBy: userId,
  });

  return res.status(201).json({
    status: 'success',
    data: newProject,
  });
});

const getAllProjects = catchAsync(async (req, res) => {
  const projects = await project.findAll();
  return res.status(200).json({
    status: 'success',
    data: projects,
  });
});
const getProject = catchAsync(async (req, res) => {});
const updateProject = catchAsync(async (req, res) => {});
const deleteProject = catchAsync(async (req, res) => {});

module.exports = {
  createProject,
  getAllProjects,
  getProject,
  updateProject,
  deleteProject,
};
