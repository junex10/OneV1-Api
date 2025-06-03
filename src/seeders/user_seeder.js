'use strict';

const bcrypt = require('bcryptjs');
const Constants = require('./constants');
const salt = bcrypt.genSaltSync(10);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const items = [
      {
        id: 1,
        email: 'admin@mail.com',
        password: bcrypt.hashSync('123456', salt),
        level_id: Constants.USERS.LEVELS.ADMIN,
        verified: Constants.SEEDERS.USER_VERIFIED.VERIFIED,
        status: Constants.USERS.STATUS.ACTIVATED,
      },
      {
        id: 2,
        email: 'user@mail.com',
        password: bcrypt.hashSync('123456', salt),
        level_id: Constants.USERS.LEVELS.USER,
        verified: Constants.SEEDERS.USER_VERIFIED.VERIFIED,
        status: Constants.USERS.STATUS.ACTIVATED,
      },
      {
        id: 3,
        email: 'user_party@mail.com',
        password: bcrypt.hashSync('123456', salt),
        level_id: Constants.USERS.LEVELS.USER,
        verified: Constants.SEEDERS.USER_VERIFIED.VERIFIED,
        status: Constants.USERS.STATUS.ACTIVATED,
      },
    ];
    return queryInterface.bulkInsert('users', items);
  },

  down: async (queryInterface, Sequelize) => {},
};
