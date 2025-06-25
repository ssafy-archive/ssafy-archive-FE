import { defineStore } from 'pinia';
import type { GroupRole } from '@/types/type';

interface GroupState {
  groupId: number | null;
  groupName: string | null;
  groupKey: string | null;
  groupRole: GroupRole | null;
}

export const useGroupStore = defineStore('group', {
  state: (): GroupState => ({
    groupId: null,
    groupName: null,
    groupKey: null,
    groupRole: null,
  }),

  getters: {
    getGroupId: state => state.groupId,
    getGroupName: state => state.groupName,
    getGroupKey: state => state.groupKey,
    getGroupRole: state => state.groupRole,
  },

  actions: {
    setGroup(groupId: number, groupName: string, groupKey: string, groupRole: GroupRole) {
      this.groupId = groupId;
      this.groupName = groupName;
      this.groupKey = groupKey;
      this.groupRole = groupRole;
    },
  },
});
