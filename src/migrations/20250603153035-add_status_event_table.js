'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('events', 'status', {
        after: 'likes',
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 1, // Active
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([queryInterface.removeColumn('events', 'status')]);
  },
};
