'use strict';

const Constants = require('./../seeders/constants');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('life_style', {
      id: Constants.PRIMARY_KEY,
      kids: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      smoking: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      drinking: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      ...Constants.DATES_CONTROL
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('life_style');
  }
};
