import { defineStore } from 'pinia';

interface GroupState {
  groupId: number | null;
  groupName: string | null;
}

export const useGroupStore = defineStore('group', {
  state: (): GroupState => ({
    groupId: null,
    groupName: null,
  }),

  getters: {
    getGroupId: state => state.groupId,
    getGroupName: state => state.groupName,
  },

  actions: {
    setGroup(groupId: number, groupName: string) {
      this.groupId = groupId;
      this.groupName = groupName;
    },
  },
});
