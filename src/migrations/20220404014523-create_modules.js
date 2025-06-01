'use strict';
const constants = require('./../seeders/constants');

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('modules', {
      id: constants.PRIMARY_KEY,
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      icon: {
        type: Sequelize.STRING,
        allowNull: false
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: constants.STATUS
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('modules');
  }
};
