'use strict';

const Constants = require('./../seeders/constants');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('chats', {
      id: Constants.PRIMARY_KEY,
      chat_session_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'chats_session',
          key: 'id'
        }
      },
      sender_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      message: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ...Constants.DATES_CONTROL
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('chats');
  }
};