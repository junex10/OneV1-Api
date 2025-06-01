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
      type: Sequelize.DATE
    },
    updated_at: {
      allowNull: true,
      type: Sequelize.DATE
    },
    deleted_at: {
      allowNull: true,
      type: Sequelize.DATE
    }
  },
  STATUS: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  SEEDERS: {
    USER_VERIFIED: {
      VERIFIED: 1,
      NO_VERIFIED: 0
    },
    MODULES_STATUS: {
      AVAILABLE: 1,
      DISABLED: 0
    },
    MODULES: {
      PROFILE: 1,
      SWIPE: 2,
      MATCHES: 3,
      MAIN: 4,
      CHAT: 5
    },
    ACTIONS: {
      MAIN: 1,
      NO_MAIN: 0
    },
    MATCHES: {
      STAND_BY: 1,
      REJECTED: 2,
      ACCEPTED: 3,
      BLOCKED: 4
    },
    REPORTED_USERS: {
      RECEIVED: 1,
      IN_PROCESS: 2,
      REJECTED: 3,
      ACCEPTED: 4,
      FINISHED: 5
    }
  },
  USERS: {
    LEVELS: {
      ADMIN: 1,
      USER: 2
    },
    STATUS: {
      ACTIVATED: 1,
      DISABLED: 0
    }
  }
}