const { Model, Sequelize, DataTypes } = require('sequelize');
const bcryptjs = require('bcryptjs');
const sequelize = require('../../config/dbConnect');
const AppError = require('../../utils/appError');

const user = sequelize.define(
  'user',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userType: {
      type: DataTypes.ENUM('0', '1', '2'),
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    // implement password hashing Logic
    confirmPassword: {
      type: DataTypes.VIRTUAL,
      set(value) {
        if (value == this.password) {
          const hashPassword = bcryptjs.hashSync(value, 10);
          this.setDataValue('password', hashPassword);
        } else {
          throw new AppError(
            'Password and confirm password must be the same',
            400
          );
        }
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    modelName: 'user',
  }
);

module.exports = user;
