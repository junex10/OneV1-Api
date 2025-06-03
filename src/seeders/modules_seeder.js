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
        status: Constants.SEEDERS.MODULES_STATUS.AVAILABLE,
      },
      {
        id: 2,
        name: 'Chat',
        icon: 'chat',
        code: 'chat',
        status: Constants.SEEDERS.MODULES_STATUS.AVAILABLE,
      },
      {
        id: 3,
        name: 'Testing', // This allow to test the database uploading JSON
        icon: 'test',
        code: 'test',
        status: Constants.SEEDERS.MODULES_STATUS.AVAILABLE,
      },
    ];
    return queryInterface.bulkInsert('modules', items);
  },

  down: async (queryInterface, Sequelize) => {},
};
