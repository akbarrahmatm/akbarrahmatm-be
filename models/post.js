"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      post.belongsTo(models.category, {
        foreignKey: {
          name: "category_id",
        },
        as: "category_detail",
      });

      post.belongsTo(models.user, {
        foreignKey: {
          name: "user_id",
        },
        as: "user_detail",
      });
    }
  }
  post.init(
    {
      post_id: {
        type: DataTypes.STRING(36),
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      post_title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      post_description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      post_content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      post_image: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      post_slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      category_id: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
      user_id: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "post",
      tableName: "post",
      timestamps: false,
    }
  );
  return post;
};
