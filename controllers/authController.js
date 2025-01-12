const user = require('../db/models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Generate a token
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const signup = catchAsync(async (req, res) => {
  // Get the request body
  const body = req.body;

  // Check if the user type is valid

  if (!['1', '2'].includes(body.userType)) {
    throw new AppError('Invalid user type', 400);
  }

  // Create a new user
  const newUser = await user.create({
    userType: body.userType,
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: body.password,
    confirmPassword: body.confirmPassword,
  });

  // Check if the user was created
  if (!newUser) {
    return next(new AppError('Failed to create the user', 400));
  }

  // Remove password and deletedAt from the response
  const result = newUser.toJSON();
  delete result.password;
  delete result.deletedAt;

  result.token = generateToken({ id: result.id });

  return res.status(201).json({
    status: 'success',
    data: result,
    message: 'User created, please login',
  });
});

const login = catchAsync(async (req, res, next) => {
  // Get the request body
  const { email, password } = req.body;

  // Check if the email and password are provided
  // if (!email || !password) {
  //   return res.status(400).json({
  //     status: 'error',
  //     message: 'Please provide email and password',
  //   });
  // }

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // Check if the user exists
  const existingUser = await user.findOne({ where: { email } });
  if (!existingUser) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // check if the password matches
  isPasswordMatch = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordMatch) {
    return next(new AppError('Incorrect email or password', 401));
  }
  // Generate a JWT token
  const token = generateToken({
    id: existingUser.id,
  });

  return res.status(200).json({
    status: 'success',
    message: 'User logged in successfully',
    data: {
      token,
      user: existingUser,
    }, // Return the JWT token and the user data
  });
});

module.exports = { signup, login };
