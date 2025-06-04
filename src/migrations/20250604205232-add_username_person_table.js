'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('person', 'username', {
        after: 'user_id',
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.addColumn('person', 'phone', {
        after: 'user_id',
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('person', 'username'),
      queryInterface.removeColumn('person', 'phone'),
    ]);
  },
};
