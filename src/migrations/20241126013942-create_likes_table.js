'use strict';

const Constants = require('../seeders/constants');

// If the like person likes main person, the like person would appear on main person on likes screen
// If main person likes like person, the main person would appear on likes person on likes screen
// If both of them likes each other, it would be a matched and it would NOT appear on likes screen

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('likes', {
      id: Constants.PRIMARY_KEY,
      user_id: { // Main person who has the likes
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      like_user_id: { // Person who likes the main person and each other
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: Constants.SEEDERS.MATCHES.STAND_BY
      },
      ...Constants.DATES_CONTROL
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('likes');
  }
};
