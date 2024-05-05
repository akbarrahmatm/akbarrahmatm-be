"use strict";
/** @type {import('sequelize-cli').Migration} */
const { v4 } = require("uuid");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Posts", {
      post_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: v4(),
      },
      post_title: {
        type: Sequelize.STRING,
      },
      post_description: {
        type: Sequelize.TEXT,
      },
      post_content: {
        type: Sequelize.TEXT,
      },
      post_image: {
        type: Sequelize.STRING,
      },
      post_slug: {
        type: Sequelize.STRING,
      },
      category_id: {
        type: Sequelize.UUID,
      },
      user_id: {
        type: Sequelize.UUID,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Posts");
  },
};
