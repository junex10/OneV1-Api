'use strict';

const constants = require('../seeders/constants');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('levels', {
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

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('levels');
  }
};
