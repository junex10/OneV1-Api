'use strict';

const Constants = require('./../seeders/constants');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('chats_users', {
      id: Constants.PRIMARY_KEY,
      chat_session_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'chats_session',
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
      viewed: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0,
        comment: 'Not read = 0; readed = 1'
      },
      ...Constants.DATES_CONTROL
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('chats_users');
  }
};