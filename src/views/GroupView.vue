<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50 px-10">
    <div class="w-full max-w-5xl">
      <div class="grid w-full grid-cols-1 place-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <CreateGroupItem @click='handleCreateClick' />
        <GroupItem v-for="group in groups" :key="group.groupId" :title="group.groupName"
          @cardClick="handleGroupClick(group.groupId)" />
      </div>
    </div>

    <!-- 그룹 생성 모달 -->
    <CreateGroupModal v-model:isOpen="showCreateModal" @created="handleGroupCreated" />
  </div>
</template>

<script setup lang="ts">
import GroupItem from '@/components/views/group/GroupItem.vue';
import CreateGroupItem from '@/components/views/group/CreateGroupItem.vue';
import CreateGroupModal from '@/components/views/group/CreateGroupModal.vue';
import { getMyGroups } from '@/services/api/domains/group/index';
import { onMounted, ref } from 'vue';
import type { Group } from '@/types/type';

// 그룹 데이터
const groups = ref<Group[]>([]);

// 모달 표시 상태
const showCreateModal = ref(false);

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

// 그룹 생성 버튼 클릭 핸들러
const handleCreateClick = () => {
  showCreateModal.value = true;
};

// 그룹 생성 완료 핸들러
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleGroupCreated = () => {
  // 그룹 생성 후 전체 목록을 다시 불러오기
  fetchGroups();
};

const handleGroupClick = (groupId: number) => {
  // 그룹 클릭 시 처리 로직
  console.log(`Group ${groupId} clicked`);
};
</script>
