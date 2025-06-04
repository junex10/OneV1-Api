'use strict';

const Constants = require('./../seeders/constants');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users_code', {
      id: Constants.PRIMARY_KEY,
      code: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: Constants.USERS.USER_CODE_STATUS.AVAILABLE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users_code');
  },
};
