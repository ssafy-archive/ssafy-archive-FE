<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50 px-4">
    <div class="w-full max-w-md">
      <div class="flex w-full flex-col items-center space-y-4">
        <CreateGroupItem />
        <GroupItem title="내가 속한 그룹 1" />
        <GroupItem title="내가 속한 그룹 2" />
        <GroupItem title="내가 속한 그룹 2" />
        <GroupItem title="내가 속한 그룹 2" />
        <GroupItem title="내가 속한 그룹 2" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import GroupItem from '@/components/views/group/GroupItem.vue';
import CreateGroupItem from '@/components/views/group/CreateGroupItem.vue';
</script>
