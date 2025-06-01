'use strict';

const constants = require('./../seeders/constants');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('password_resets', {
      id: constants.PRIMARY_KEY,
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { 
          model: 'users',
          key: 'id'
        }
      },
      token: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      status: constants.STATUS,
      ...constants.DATES_CONTROL
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('password_resets');
  }
};
