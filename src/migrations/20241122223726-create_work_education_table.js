'use strict';

const Constants = require('./../seeders/constants');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('work_education', {
      id: Constants.PRIMARY_KEY,
      work: {
        type: Sequelize.STRING,
        allowNull: true
      },
      company: {
        type: Sequelize.STRING,
        allowNull: true
      },
      high_school: {
        type: Sequelize.STRING,
        allowNull: true
      },
      college: {
        type: Sequelize.STRING,
        allowNull: true
      },
      ...Constants.DATES_CONTROL
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('work_education');
  }
};
