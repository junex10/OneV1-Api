'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const items = [
      {
        name: 'Party',
      },
      {
        name: 'Protest',
      },
      {
        name: 'Car racing',
      },
      {
        name: 'Personal',
      },
    ];
    return queryInterface.bulkInsert('events_type', items);
  },

  down: async (queryInterface, Sequelize) => {},
};
