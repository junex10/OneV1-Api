const Sequelize = require('sequelize');

module.exports = {
  PRIMARY_KEY: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  },
  DATES_CONTROL: {
    created_at: {
      allowNull: true,
      type: Sequelize.DATE,
    },
    updated_at: {
      allowNull: true,
      type: Sequelize.DATE,
    },
    deleted_at: {
      allowNull: true,
      type: Sequelize.DATE,
    },
  },
  STATUS: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  SEEDERS: {
    USER_VERIFIED: {
      VERIFIED: 1,
      NO_VERIFIED: 0,
    },
    MODULES_STATUS: {
      AVAILABLE: 1,
      DISABLED: 0,
    },
    MODULES: {
      PROFILE: 1,
      CHAT: 2,
      TESTING: 3,
    },
    ACTIONS: {
      MAIN: 1,
      NO_MAIN: 0,
    },
  },
  USERS: {
    LEVELS: {
      ADMIN: 1,
      USER: 2,
    },
    STATUS: {
      ACTIVATED: 1,
      DISABLED: 0,
    },
  },
};
