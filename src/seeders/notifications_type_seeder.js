'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.bulkDelete('notification_types');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    const items = [
      {
        id: 1,
        name: 'New user',
        code: 'auth/new-user'
      }
    ];
    return queryInterface.bulkInsert('notification_types',items);
  },

  down: async (queryInterface, Sequelize) => {}
};
