'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Blog.belongsTo(models.User, {foreignKey: 'UserId', as: 'Blog'})
    }
  }
  Blog.init({
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    slug: DataTypes.STRING,
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    }
  },
  {
    hooks: {
      afterUpdate: (Blog) => {
        Blog.slug = Blog.title.replace(/ /g, "-")
      },
      beforeCreate: (Blog) => {
        Blog.slug = Blog.title.replace(/ /g, "-")
      },
    },
    sequelize,
    modelName: 'Blog',
  });
  return Blog;
};