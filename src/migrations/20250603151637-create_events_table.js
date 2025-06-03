'use strict';

const Constants = require('./../seeders/constants');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('events', {
      id: Constants.PRIMARY_KEY,
      event_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'events_type',
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
      main_pic: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      latitude: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      longitude: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      likes: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      expiration_time: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      ...Constants.DATES_CONTROL,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('events');
  },
};
