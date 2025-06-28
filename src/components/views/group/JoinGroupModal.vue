<template>
    <BaseModal v-model="modalOpen" size="md" @close="handleClose" :persistent="true">
        <template #header>
            <h2 class="text-lg font-semibold leading-none tracking-tight">그룹 참여하기</h2>
            <p class="text-sm text-muted-foreground mt-1">그룹 코드를 입력하여 그룹에 참여하세요.</p>
        </template>

        <form @submit.prevent="handleSubmit" class="py-4 space-y-4">
            <div class="space-y-2">
                <label for="groupKey" class="block text-sm font-medium">그룹 코드</label>
                <input id="groupKey" v-model="groupKey" type="text"
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="그룹 코드를 입력하세요" :class="{ 'border-red-500': errors.groupKey }"
                    @input="validateGroupKey" />
                <p v-if="errors.groupKey" class="text-sm text-red-500 mt-1">{{ errors.groupKey }}</p>
            </div>
        </form>

        <template #footer>
            <div class="flex justify-end gap-2">
                <button type="button" class="px-4 py-2 border rounded-md hover:bg-gray-50" @click="handleClose">
                    취소
                </button>
                <button type="button" class="px-4 py-2 border rounded-md bg-primary-600 hover:bg-primary-700"
                    :class="{ 'opacity-50 cursor-not-allowed': !isValid || isLoading }"
                    :disabled="!isValid || isLoading" @click="handleSubmit">
                    <span v-if="isLoading">참여 중...</span>
                    <span v-else>참여하기</span>
                </button>
            </div>
        </template>
    </BaseModal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import BaseModal from '@/components/modal/BaseModal.vue';
import { joinGroup } from '@/services/api/domains/group/index';
import { toast } from 'vue-sonner';

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['update:isOpen', 'joined']);

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
const groupKey = ref('');
const errors = ref({
    groupKey: '',
});
const isLoading = ref(false);

// 유효성 검사 함수
const validateGroupKey = () => {
    if (!groupKey.value.trim()) {
        errors.value.groupKey = '그룹 코드를 입력해주세요.';
    } else if (groupKey.value.length < 6) {
        errors.value.groupKey = '그룹 코드는 최소 6자 이상이어야 합니다.';
    } else {
        errors.value.groupKey = '';
    }
};

// 폼 유효성 여부
const isValid = computed(() => {
    return groupKey.value.trim().length >= 6 && !errors.value.groupKey;
});

// 폼 제출 핸들러
const handleSubmit = async () => {
    validateGroupKey();

    if (!isValid.value) return;

    try {
        isLoading.value = true;

        // API 호출
        await joinGroup(groupKey.value.trim());
        emit('joined');
        handleClose();

    } catch (error) {
        console.error('그룹 참여 실패:', error);
        toast.error('그룹 참여 실패', {
            description: '올바른 그룹 코드인지 확인해주세요.',
            duration: 3000,
        });
    } finally {
        isLoading.value = false;
    }
};

// 모달 닫기 핸들러
const handleClose = () => {
    groupKey.value = '';
    errors.value.groupKey = '';
    modalOpen.value = false;
};
</script>
