export type User = {
  userId: number;       
  loginId: string;
  name: string;
  ssafyNumber: string;
  userRole: string;
};

export type AuthToken = {
  accessToken: string;
  refreshToken: string;
};
