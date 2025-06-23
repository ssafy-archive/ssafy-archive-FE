<template>
  <form @submit.prevent="handleSubmit" class="w-full">
    <div class="mb-4">
      <input
        v-model="usernameModel"
        type="text"
        placeholder="아이디 입력"
        class="box-border min-h-[3rem] w-full touch-manipulation rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-4 text-base placeholder-gray-400 transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 sm:min-h-0 sm:py-4"
        :disabled="loading"
        autocomplete="username"
        @keyup.enter="focusPassword"
        ref="usernameInput"
      />
    </div>

    <div class="mb-4">
      <input
        v-model="passwordModel"
        type="password"
        placeholder="비밀번호 입력"
        class="box-border min-h-[3rem] w-full touch-manipulation rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-4 text-base placeholder-gray-400 transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 sm:min-h-0 sm:py-4"
        :disabled="loading"
        autocomplete="current-password"
        @keyup.enter="handleSubmit"
        ref="passwordInput"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';

interface Props {
  username: string;
  password: string;
  loading?: boolean;
}

interface Emits {
  (e: 'update:username', value: string): void;
  (e: 'update:password', value: string): void;
  (e: 'submit'): void;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
});

const emit = defineEmits<Emits>();

// 입력 참조
const usernameInput = ref<HTMLInputElement>();
const passwordInput = ref<HTMLInputElement>();

// v-model 처리
const usernameModel = computed({
  get: () => props.username,
  set: (value: string) => emit('update:username', value),
});

const passwordModel = computed({
  get: () => props.password,
  set: (value: string) => emit('update:password', value),
});

// 폼 제출
const handleSubmit = () => {
  emit('submit');
};

// 비밀번호 입력으로 포커스 이동
const focusPassword = () => {
  passwordInput.value?.focus();
};

// 마운트 시 첫 번째 입력에 포커스
onMounted(() => {
  usernameInput.value?.focus();
});
</script>
