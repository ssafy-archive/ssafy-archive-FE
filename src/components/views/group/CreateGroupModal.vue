<template>
  <BaseModal v-model="modalOpen" size="md" @close="handleClose" :persistent="true">
    <template #header>
      <h2 class="text-lg font-semibold leading-none tracking-tight">새 그룹 생성</h2>
      <p class="text-sm text-muted-foreground mt-1">그룹을 생성하여 자료를 공유하고 관리하세요.</p>
    </template>

    <form @submit.prevent="handleSubmit" class="py-4 space-y-4">
      <div class="space-y-2">
        <label for="groupName" class="block text-sm font-medium">그룹 이름</label>
        <input id="groupName" v-model="groupName" type="text"
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="그룹 이름을 입력하세요" :class="{ 'border-red-500': errors.groupName }" @input="validateGroupName" />
        <p v-if="errors.groupName" class="text-sm text-red-500 mt-1">{{ errors.groupName }}</p>
      </div>
    </form>

    <template #footer>
      <div class="flex justify-end gap-2">
        <button type="button" class="px-4 py-2 border rounded-md hover:bg-gray-50" @click="handleClose">
          취소
        </button>
        <button type="button" class="px-4 py-2 border rounded-md bg-primary-600 hover:bg-primary-700"
          :class="{ 'opacity-50 cursor-not-allowed': !isValid || isLoading }" :disabled="!isValid || isLoading"
          @click="handleSubmit">
          <span v-if="isLoading">생성 중...</span>
          <span v-else>생성하기</span>
        </button>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import BaseModal from '@/components/modal/BaseModal.vue';
import { createGroup } from '@/services/api/domains/group/index';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:isOpen', 'created']);

// 모달 상태 관리
const modalOpen = ref(props.isOpen);

// 동기화: props -> internal state
watch(() => props.isOpen, (newVal) => {
  modalOpen.value = newVal;
}, { immediate: true });

// 동기화: internal state -> emit event
watch(modalOpen, (newVal) => {
  if (newVal !== props.isOpen) {
    emit('update:isOpen', newVal);
  }
});

// 상태 관리
const groupName = ref('');
const errors = ref({
  groupName: '',
});
const isLoading = ref(false);

// 유효성 검사 함수
const validateGroupName = () => {
  if (!groupName.value.trim()) {
    errors.value.groupName = '그룹 이름을 입력해주세요.';
  } else if (groupName.value.length < 2) {
    errors.value.groupName = '그룹 이름은 최소 2자 이상이어야 합니다.';
  } else if (groupName.value.length > 20) {
    errors.value.groupName = '그룹 이름은 최대 20자까지 가능합니다.';
  } else {
    errors.value.groupName = '';
  }
};

// 폼 유효성 여부
const isValid = computed(() => {
  return groupName.value.trim().length >= 2 &&
    groupName.value.length <= 20 &&
    !errors.value.groupName;
});

// 폼 제출 핸들러
const handleSubmit = async () => {
  validateGroupName();

  if (!isValid.value) return;

  try {
    isLoading.value = true;

    // API 호출 - API 타입에 맞게 호출
    await createGroup(groupName.value.trim());
    emit('created');
    handleClose();

  } catch (error) {
    console.error('그룹 생성 실패:', error);
  } finally {
    isLoading.value = false;
  }
};

// 모달 닫기 핸들러
const handleClose = () => {
  groupName.value = '';
  errors.value.groupName = '';
  modalOpen.value = false;
};
</script>