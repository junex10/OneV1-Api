'use strict';

const Constants = require('./constants');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.bulkDelete('permissions');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    let items = [];

    items = [
      {
        action_id: Constants.SEEDERS.MODULES.PROFILE,
        level_id: Constants.USERS.LEVELS.ADMIN,
      },
      {
        action_id: Constants.SEEDERS.MODULES.CHAT,
        level_id: Constants.USERS.LEVELS.ADMIN,
      },
      {
        action_id: Constants.SEEDERS.MODULES.FRIENDS,
        level_id: Constants.USERS.LEVELS.ADMIN,
      },
      {
        action_id: Constants.SEEDERS.MODULES.EVENTS,
        level_id: Constants.USERS.LEVELS.ADMIN,
      },
    ];
    queryInterface.bulkInsert('permissions', items);

    items = [
      {
        action_id: Constants.SEEDERS.MODULES.PROFILE,
        level_id: Constants.USERS.LEVELS.USER,
      },
      {
        action_id: Constants.SEEDERS.MODULES.CHAT,
        level_id: Constants.USERS.LEVELS.USER,
      },
      {
        action_id: Constants.SEEDERS.MODULES.FRIENDS,
        level_id: Constants.USERS.LEVELS.USER,
      },
      {
        action_id: Constants.SEEDERS.MODULES.EVENTS,
        level_id: Constants.USERS.LEVELS.USER,
      },
    ];

    return queryInterface.bulkInsert('permissions', items);
  },

  down: async (queryInterface, Sequelize) => {},
};
