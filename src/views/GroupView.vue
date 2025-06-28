<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50 px-10">
    <div class="w-full max-w-5xl">
      <div class="flex justify-between mb-4">
        <h1 class="text-2xl font-bold">나의 그룹</h1>
        <div class="flex gap-2">
          <button class="px-4 py-2 border rounded-md bg-green-600 hover:bg-green-700 text-white"
            @click="handleJoinClick">
            <span class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clip-rule="evenodd" />
              </svg>
              그룹 참여하기
            </span>
          </button>
        </div>
      </div>
      <div class="grid w-full grid-cols-1 place-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <CreateGroupItem @click='handleCreateClick' />
        <GroupItem v-for="group in groups" :key="group.groupId" :title="group.groupName"
          @cardClick="(group) => handleGroupClick(group)" />
      </div>
    </div>

    <!-- 그룹 생성 모달 -->
    <CreateGroupModal v-model:isOpen="showCreateModal" @created="handleGroupCreated" />

    <!-- 그룹 참여 모달 -->
    <JoinGroupModal v-model:isOpen="showJoinModal" @joined="handleGroupJoined" />

    <!-- Sonner 토스트 컴포넌트 -->
  </div>
</template>

<script setup lang="ts">
import GroupItem from '@/components/views/group/GroupItem.vue';
import CreateGroupItem from '@/components/views/group/CreateGroupItem.vue';
import CreateGroupModal from '@/components/views/group/CreateGroupModal.vue';
import JoinGroupModal from '@/components/views/group/JoinGroupModal.vue';
import { getMyGroups } from '@/services/api/domains/group/index';
import { onMounted, ref } from 'vue';
import type { Group } from '@/types/type';
import { toast } from 'vue-sonner';
import { useGroupStore } from '@/stores/group';

// 그룹 데이터
const groups = ref<Group[]>([]);

// 모달 표시 상태
const showCreateModal = ref(false);
const showJoinModal = ref(false);
const groupStore = useGroupStore();

const fetchGroups = async () => {
  try {
    const response = await getMyGroups();
    groups.value = response.groupList;
  } catch (error) {
    console.error('Failed to fetch groups:', error);
    toast.error('그룹 목록을 불러오는데 실패했습니다.', {
      description: '잠시 후 다시 시도해주세요.',
    });
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

// 그룹 참여 버튼 클릭 핸들러
const handleJoinClick = () => {
  showJoinModal.value = true;
};

// 그룹 생성 완료 핸들러
const handleGroupCreated = () => {
  // 그룹 생성 후 전체 목록을 다시 불러오기
  fetchGroups();

  // 성공 토스트 메시지 표시
  toast.success('그룹 생성 완료', {
    description: '새로운 그룹이 성공적으로 생성되었습니다.',
    duration: 3000,
  });
};

// 그룹 참여 완료 핸들러
const handleGroupJoined = () => {
  // 그룹 참여 후 전체 목록을 다시 불러오기
  fetchGroups();

  // 성공 토스트 메시지 표시
  toast.success('그룹 참여 완료', {
    description: '그룹에 성공적으로 참여했습니다.',
    duration: 3000,
  });
};

const handleGroupClick = (group: Group) => {
  // 그룹 클릭 시 처리 로직
  groupStore.setGroup(group.groupId, group.groupName, group.groupKey, group.groupRole);
};
</script>
