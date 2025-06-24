<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50 px-10">
    <div class="w-full max-w-5xl">
      <div
        class="grid w-full grid-cols-1 place-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
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
