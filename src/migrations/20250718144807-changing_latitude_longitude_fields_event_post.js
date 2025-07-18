'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('events_post', 'latitude', {
        type: Sequelize.STRING,
      }),
      queryInterface.changeColumn('events_post', 'longitude', {
        type: Sequelize.STRING,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('events_post', 'latitude', {
        type: Sequelize.INTEGER,
      }),
      queryInterface.changeColumn('events_post', 'longitude', {
        type: Sequelize.INTEGER,
      }),
    ]);
  },
};
