'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Blog, {foreignKey: 'UserId', as: 'user'})
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  },
  {
    hooks: {
      beforeCreate: (User) => {
        const salt = bcrypt.genSaltSync(8)
        User.password = bcrypt.hashSync(User.password, salt)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};