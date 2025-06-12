'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('chats', 'message', {
        type: Sequelize.TEXT,
        allowNull: true,
      }),
      queryInterface.changeColumn('chats', 'attachment', {
        type: Sequelize.TEXT,
        allowNull: true,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('chats', 'message', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.changeColumn('chats', 'attachment', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
    ]);
  },
};
