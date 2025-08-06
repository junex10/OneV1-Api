'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('notifications', 'event_id', {
        after: 'status',
        type: Sequelize.INTEGER,
        references: {
          model: 'events',
          key: 'id',
        },
        allowNull: true,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('notifications', 'event_id'),
    ]);
  },
};
