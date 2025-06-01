'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'person',
        'age',
        {
          type: Sequelize.INTEGER,
          after: 'lastname',
          allowNull: false,
          default: 18
        }
      ),
      queryInterface.addColumn(
        'person',
        'gender',
        {
          after: 'age',
          type: Sequelize.STRING,
          allowNull: true
        }
      ),
      queryInterface.addColumn(
        'person',
        'looking_for_id',
        {
          after: 'gender',
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'looking_for_users',
            key: 'id'
          }
        }
      ),
      queryInterface.addColumn(
        'person',
        'height',
        {
          after: 'looking_for_id',
          type: Sequelize.STRING,
          allowNull: true
        }
      ),
      queryInterface.addColumn(
        'person',
        'hometown',
        {
          after: 'height',
          type: Sequelize.STRING,
          allowNull: true
        }
      ),
      queryInterface.addColumn(
        'person',
        'languages_spoken_id',
        {
          after: 'hometown',
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'languages_spoken',
            key: 'id'
          }
        }
      ),
      queryInterface.addColumn(
        'person',
        'work_education_id',
        {
          after: 'languages_spoken_id',
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'work_education',
            key: 'id'
          }
        }
      ),
      queryInterface.addColumn(
        'person',
        'life_style_id',
        {
          after: 'work_education_id',
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'life_style',
            key: 'id'
          }
        }
      ),
      queryInterface.addColumn(
        'person',
        'belief',
        {
          after: 'life_style_id',
          type: Sequelize.INTEGER,
          allowNull: true
        }
      ),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('person', 'age'),
      queryInterface.removeColumn('person', 'dating_location_id'),
      queryInterface.removeColumn('person', 'height'),
      queryInterface.removeColumn('person', 'hometown'),
      queryInterface.removeColumn('person', 'languages_spoken_id'),
      queryInterface.removeColumn('person', 'work_education_id'),
      queryInterface.removeColumn('person', 'life_style_id'),
      queryInterface.removeColumn('person', 'belief'),
    ])
  }
};
