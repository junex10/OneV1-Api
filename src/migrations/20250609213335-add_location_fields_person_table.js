'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('person', 'latitude', {
        after: 'subscribers',
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('person', 'longitude', {
        after: 'subscribers',
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('person', 'latitude'),
      queryInterface.removeColumn('person', 'longitude'),
    ]);
  },
};
