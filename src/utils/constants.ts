enum COMPANY_INFORMATION {
  NAME = 'One',
  ID = 1,
  DESCRIPTION = 'One',
}
enum LEVELS {
  ADMIN = 1,
  USER = 2,
}
enum PASSWORD_RESET_STATUS {
  ACTIVE = 1,
  INACTIVE = 0,
}

export default {
  COMPANY_INFORMATION,
  LEVELS,
  PASSWORD_RESET_STATUS,
  USER: {
    USER_VERIFIED: {
      VERIFIED: 1,
      NO_VERIFIED: 0,
    },
    USER_CODE_STATUS: {
      AVAILABLE: 1,
      DISABLED: 0,
    },
  },
  NOTIFICATIONS: {
    STATUS: {
      READED: 1,
      UNREADED: 0,
    },
  },
  PER_PAGE: 30,
  PER_PAGE_WEB: 10,
  ACTIONS: {
    MAIN: 1,
    NO_MAIN: 0,
  },
  MODULES: {
    PROFILE: '/dashboard/profile',
    RECIPES: '/recipes',
    TESTING: '/test',
  },
  EVENT_STATUS: {
    ACTIVE: 1,
    ALMOST_FINISHED: 2,
    FINISHED: 3,
  },
};
