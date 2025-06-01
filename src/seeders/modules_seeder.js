'use strict';

const Constants = require('./constants');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.bulkDelete('modules');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    const items = [
      {
        id: 1,
        name: 'Profile',
        icon: 'profile',
        code: 'profile',
        status: Constants.SEEDERS.MODULES_STATUS.AVAILABLE
      },
      {
        id: 2,
        name: 'Swipe',
        icon: 'swipe',
        code: 'swipe',
        status: Constants.SEEDERS.MODULES_STATUS.AVAILABLE
      },
      {
        id: 3,
        name: 'Matches',
        icon: 'matches',
        code: 'matches',
        status: Constants.SEEDERS.MODULES_STATUS.AVAILABLE
      },
      {
        id: 4,
        name: 'Main',
        icon: 'main',
        code: 'main',
        status: Constants.SEEDERS.MODULES_STATUS.AVAILABLE
      },
      {
        id: 5,
        name: 'Chat',
        icon: 'chat',
        code: 'chat',
        status: Constants.SEEDERS.MODULES_STATUS.AVAILABLE
      }
    ];
    return queryInterface.bulkInsert('modules',items);
  },

  down: async (queryInterface, Sequelize) => {}
};
