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

export type Group = {
  groupId: number;
  groupName: string;
  groupKey: string;
  groupRole: GroupRole;
};

export type GroupRole = 'ADMIN' | 'MEMBER' | 'CREATOR';
