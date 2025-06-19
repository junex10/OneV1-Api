'use strict';

const Constants = require('./../seeders/constants');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('events_users_joined', {
      id: Constants.PRIMARY_KEY,
      event_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'events',
          key: 'id',
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      ...Constants.DATES_CONTROL,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('events_users_joined');
  },
};
