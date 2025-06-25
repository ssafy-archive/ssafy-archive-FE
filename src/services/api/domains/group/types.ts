import type { GroupRole } from '@/types/type';

export type GroupResponse = {
  groupId: number;
  groupName: string;
  groupKey: string;
  groupRole: GroupRole;
};

export type GroupListResponse = {
  groupList: GroupResponse[];
};
