export const USER = {
  LOGIN: 'v1/user/login',
  LOGOUT: 'v1/user/logout',
  CREATE_USER: 'v1/user',
  GET_USER: (userId: number) => `v1/user/${userId}`,
  UPDATE_USER: (userId: number) => `v1/user/${userId}`,
  DELETE_USER: (userId: number) => `v1/user/${userId}`,
  UPDATE_PASSWORD: (userId: number) => `v1/user/${userId}/password`,
} as const;

export const GROUP = {
  GET_MY_GROUPS: '/group/myGroups',
  GROUP: '/group',
} as const;
