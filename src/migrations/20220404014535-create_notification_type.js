'use strict';

const constants = require('./../seeders/constants');

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('notification_types', {
      id: constants.PRIMARY_KEY,
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ...constants.DATES_CONTROL
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('notification_types');
  }
};
