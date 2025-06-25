export const USER = {
  LOGIN: 'user/login',
  LOGOUT: 'user/logout',
  CREATE_USER: 'user',
  GET_USER: (userId: number) => `user/${userId}`,
  UPDATE_USER: (userId: number) => `user/${userId}`,
  DELETE_USER: (userId: number) => `user/${userId}`,
  UPDATE_PASSWORD: (userId: number) => `user/${userId}/password`,
} as const;
