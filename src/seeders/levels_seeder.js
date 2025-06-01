'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const items = [
      {
        id: 1,
        name: 'Admin',
        code: 'user/admin'
      },
      {
        id: 2,
        name: 'User',
        code: 'user/'
      }
    ];
    return queryInterface.bulkInsert('levels',items);
  },

  down: async (queryInterface, Sequelize) => {}
};
