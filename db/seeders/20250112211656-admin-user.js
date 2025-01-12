const bcryptjs = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let password = process.env.ADMIN_PASSWORD;
    const hashPassword = bcryptjs.hashSync(password, 10);
    return queryInterface.bulkInsert('user', [
      {
        userType: '0',
        firstName: 'Anthony',
        lastName: 'Obi',
        email: process.env.ADMIN_EMAIL,
        password: hashPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', { userType: '0' }, {});
  },
};
