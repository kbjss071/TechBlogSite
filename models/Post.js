const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {

}

Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "user",
            key: "id"
        }
      },
      title: {
        type: DataTypes.STRING
      },
      content: {
        type: DataTypes.STRING,
      },
      comment_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "comment",
            key: "id"
        }
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: true
      }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'post',
    }
  );
  
  module.exports = Post;