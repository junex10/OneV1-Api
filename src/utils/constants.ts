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
    FRIENDS: {
      FOLLOWED: 1,
      BLOCKED: 2,
    },
    LEVELS: {
      ADMIN: 1,
      USER: 2,
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
    PENDING: 0, // -> Schedule to start later, not started
    ACTIVE: 1,
    ALMOST_FINISHED: 2,
    FINISHED: 3, // This one means that the event finished but other users can joined and see the comments and stuffs
    CLOSED: 4, //Closed means that the event totally finished and no one beyond the same host can see it
  },
  CHATS: {
    VIEWED: {
      READED: 1,
      UNREAD: 0,
    },
    CHAT_SESSION: {
      AVAILABLE: 1,
      REMOVED: 0,
    },
  },
};
