"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      project.belongsTo(models.user, {
        foreignKey: {
          name: "user_id",
        },
        as: "user_detail",
      });
    }
  }
  project.init(
    {
      project_id: {
        type: DataTypes.STRING(36),
        primaryKey: true,
        allowNull: false,
      },
      project_title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      project_description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      project_content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      project_image: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      project_slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      project_source: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      project_preview: {
        type: DataTypes.STRING(255),
        allowNull: true,
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
      modelName: "project",
      tableName: "project",
      timestamps: false,
    }
  );
  return project;
};
