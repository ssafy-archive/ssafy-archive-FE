export const USER = {
  LOGIN: 'user/login',
  LOGOUT: 'user/logout',
  CREATE_USER: 'user',
  GET_USER: (userId: number) => `user/${userId}`,
  UPDATE_USER: (userId: number) => `user/${userId}`,
  DELETE_USER: (userId: number) => `user/${userId}`,
  UPDATE_PASSWORD: (userId: number) => `user/${userId}/password`,
} as const;

export const GROUP = {
  GET_MY_GROUPS: '/group/myGroups',
  GROUP: '/group',
  GROUP_REQUEST: '/group/request',
} as const;
