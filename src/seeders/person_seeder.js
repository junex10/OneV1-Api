'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.bulkDelete('person');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    const items = [
        {
            id: 1,
            name: 'ADMIN',
            lastname: 'ADMIN',
            user_id: 1
        },
        {
            id: 2,
            name: 'USER',
            user_id: 2
        }
    ];

    return queryInterface.bulkInsert('person',items);
  },

  down: async (queryInterface, Sequelize) => {}
};
