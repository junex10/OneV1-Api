'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('events', 'starting_event', {
        after: 'status',
        type: Sequelize.DATE,
        allowNull: true,
      }),
      queryInterface.addColumn('events', 'users_joined', {
        after: 'likes',
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('events', 'starting_event'),
      queryInterface.removeColumn('events', 'users_joined'),
    ]);
  },
};
