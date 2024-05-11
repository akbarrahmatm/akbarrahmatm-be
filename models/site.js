"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class site extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  site.init(
    {
      site_name: {
        type: DataTypes.STRING(100),
        primaryKey: true,
        allowNull: false,
      },
      announcement: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      site: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "site",
      timestamps: false,
      tableName: "site",
    }
  );
  return site;
};
