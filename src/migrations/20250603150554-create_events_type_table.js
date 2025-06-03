'use strict';

const Constants = require('../seeders/constants');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('events_type', {
      id: Constants.PRIMARY_KEY,
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ...Constants.DATES_CONTROL,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('events_type');
  },
};
