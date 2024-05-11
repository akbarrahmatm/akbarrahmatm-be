"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      album.belongsTo(models.user, {
        foreignKey: {
          name: "user_id",
        },
        as: "user_detail",
      });
    }
  }
  album.init(
    {
      album_id: {
        type: DataTypes.STRING(36),
        primaryKey: true,
        allowNull: false,
      },
      album_title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      album_description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      album_thumbnail: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      album_slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      taken_by: {
        type: DataTypes.STRING(255),
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
      modelName: "album",
      tableName: "album",
      timestamps: false,
    }
  );
  return album;
};
