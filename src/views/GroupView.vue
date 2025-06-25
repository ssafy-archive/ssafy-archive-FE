<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50 px-10">
    <div class="w-full max-w-5xl">
      <div class="grid w-full grid-cols-1 place-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <CreateGroupItem @click='handleCreateClick' />
        <GroupItem v-for="group in groups" :key="group.groupId" :title="group.groupName"
          @cardClick="handleGroupClick(group.groupId)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import GroupItem from '@/components/views/group/GroupItem.vue';
import CreateGroupItem from '@/components/views/group/CreateGroupItem.vue';
import { getMyGroups } from '@/services/api/domains/group/index';
import { onMounted, ref } from 'vue';
import type { Group } from '@/types/type';

const groups = ref<Group[]>([]);

const fetchGroups = async () => {
  try {
    const response = await getMyGroups();
    groups.value = response.groupList;
  } catch (error) {
    console.error('Failed to fetch groups:', error);
  }
};

onMounted(async () => {
  console.log('GroupView mounted');
  await fetchGroups();
});

const handleCreateClick = () => {
  // 그룹 생성 클릭 시 처리 로직
  console.log('Create Group clicked');
};

const handleGroupClick = (groupId: number) => {
  // 그룹 클릭 시 처리 로직
  console.log(`Group ${groupId} clicked`);
};
</script>
