'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const items = [
      {
        name: 'Party',
        default_pic: 'img/party.jpg',
      },
      {
        name: 'Protest',
        default_pic: 'img/protest.jpg',
      },
      {
        name: 'Car racing',
        default_pic: 'img/car_racing.jpg',
      },
      {
        name: 'Personal',
        default_pic: 'img/personal.jpg',
      },
      {
        name: 'Other',
        default_pic: 'img/other.jpg',
      },
    ];
    return queryInterface.bulkInsert('events_type', items);
  },

  down: async (queryInterface, Sequelize) => {},
};
