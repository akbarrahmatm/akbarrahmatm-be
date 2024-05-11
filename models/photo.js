"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      photo.belongsTo(models.user, {
        foreignKey: {
          name: "user_id",
        },
        as: "user_detail",
      });

      photo.belongsTo(models.album, {
        foreignKey: {
          name: "album_id",
        },
        as: "album_detail",
      });
    }
  }
  photo.init(
    {
      photo_id: {
        type: DataTypes.STRING(36),
        primaryKey: true,
        allowNull: false,
      },
      photo_title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      file_image: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      photo_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      album_id: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
      user_id: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
      uploaded_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "photo",
      tableName: "photo",
      timestamps: false,
    }
  );
  return photo;
};
