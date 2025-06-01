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
        id: 1,
        action_id: 1,
        level_id: Constants.USERS.LEVELS.ADMIN
      },
      {
        id: 2,
        action_id: 2,
        level_id: Constants.USERS.LEVELS.ADMIN
      },
      {
        id: 3,
        action_id: 3,
        level_id: Constants.USERS.LEVELS.ADMIN
      },
      {
        id: 4,
        action_id: 4,
        level_id: Constants.USERS.LEVELS.ADMIN
      },
      {
        id: 5,
        action_id: 5,
        level_id: Constants.USERS.LEVELS.ADMIN
      }
    ];
    queryInterface.bulkInsert('permissions',items);

    items = [
        {
          id: 6,
          action_id: 1,
          level_id: Constants.USERS.LEVELS.USER
        },
        {
          id: 7,
          action_id: 2,
          level_id: Constants.USERS.LEVELS.USER
        },
        {
          id: 8,
          action_id: 3,
          level_id: Constants.USERS.LEVELS.USER
        },
        {
          id: 9,
          action_id: 4,
          level_id: Constants.USERS.LEVELS.USER
        },
        {
          id: 10,
          action_id: 5,
          level_id: Constants.USERS.LEVELS.USER
        }
      ];

      return queryInterface.bulkInsert('permissions',items);
  },

  down: async (queryInterface, Sequelize) => {}
};
