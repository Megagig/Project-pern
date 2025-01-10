const user = require('../db/models/user');

const signup = async (req, res) => {
  const body = req.body;

  if (!['1', '2'].includes(body.userType)) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid user type',
    });
  }
  const newUser = await user.create({
    userType: body.userType,
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: body.password,
  });

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
