'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.bulkDelete('company_information');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    const items = [
        {
            id: 1,
            name: 'Dating',
            email: "dating@mail.com",
            client: 'Dating App'
        }
    ];

    return queryInterface.bulkInsert('company_information',items);
  },

  down: async (queryInterface, Sequelize) => {}
};
