const user = require('../db/models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate a token
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const signup = async (req, res) => {
  // Get the request body
  const body = req.body;

  // Check if the user type is valid

  if (!['1', '2'].includes(body.userType)) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid user type',
    });
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

  // Remove password and deletedAt from the response
  const result = newUser.toJSON();
  delete result.password;
  delete result.deletedAt;

  result.token = generateToken({ id: result.id });

  // Check if the user was created
  if (!result) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to create user',
    });
  }

  return res.status(201).json({
    status: 'success',
    data: result,
    message: 'User created, please login',
  });
};

const login = async (req, res, next) => {
  // Get the request body
  const { email, password } = req.body;

  // Check if the email and password are provided
  if (!email || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'Please provide email and password',
    });
  }

  // Check if the user exists
  const existingUser = await user.findOne({ where: { email } });
  if (!existingUser) {
    return res.status(401).json({
      status: 'fail',
      message: 'Invalid email or password',
    });
  }

  // check if the password matches
  isPasswordMatch = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordMatch) {
    return res.status(401).json({
      status: 'fail',
      message: 'Invalid email or password',
    });
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
};

module.exports = { signup, login };
