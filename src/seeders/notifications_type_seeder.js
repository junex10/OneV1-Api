'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.bulkDelete('notification_types');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    const items = [
      {
        name: 'New message',
        code: 'chat/new-message',
      },
      {
        name: 'New event',
        code: 'event/new-event',
      },
      {
        name: 'Event invitation',
        code: 'event/invite-friend',
      },
    ];
    return queryInterface.bulkInsert('notification_types', items);
  },

  down: async (queryInterface, Sequelize) => {},
};
