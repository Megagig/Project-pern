const user = require('../db/models/user');

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
  delete result.deleteAt;

  result.token = 'dummytoken';

  // Check if the user was created
  if (!newUser) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to create user',
    });
  }

  return res.status(201).json({
    status: 'success',
    data: newUser,
    message: 'User created, please login',
  });
};

module.exports = { signup };
