'use strict';

const Constants = require('./../seeders/constants');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('events_post', {
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
      likes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0,
      },
      latitude: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      longitude: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      attachment: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ...Constants.DATES_CONTROL,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('events_post');
  },
};
