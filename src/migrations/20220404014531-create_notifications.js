'use strict';
const constants = require('./../seeders/constants');

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('notifications', {
      id: constants.PRIMARY_KEY,
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      receiver_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { 
          model: 'users',
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
      status: constants.STATUS,
      ...constants.DATES_CONTROL
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('notifications');
  }
};
