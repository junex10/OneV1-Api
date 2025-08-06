'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('notifications', 'notification_type_id', {
        after: 'status',
        type: Sequelize.INTEGER,
        references: {
          model: 'notification_types',
          key: 'id',
        },
        allowNull: false,
        default: 1,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('notifications', 'notification_type_id'),
    ]);
  },
};
