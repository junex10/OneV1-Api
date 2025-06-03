'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('events', 'main_pic', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.changeColumn('events', 'latitude', {
        type: Sequelize.STRING,
      }),
      queryInterface.changeColumn('events', 'longitude', {
        type: Sequelize.STRING,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('events', 'status', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.changeColumn('events', 'latitude', {
        type: Sequelize.INTEGER,
      }),
      queryInterface.changeColumn('events', 'longitude', {
        type: Sequelize.INTEGER,
      }),
    ]);
  },
};
