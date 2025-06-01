'use strict';

const Constants = require('../seeders/constants');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('interests_users', {
      id: Constants.PRIMARY_KEY,
      interest_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'interests',
          key: 'id'
        }
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      ...Constants.DATES_CONTROL
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('interests_users');
  }
};
