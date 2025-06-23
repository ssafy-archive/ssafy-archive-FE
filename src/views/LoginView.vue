<template>
  <div class="flex min-h-screen flex-col justify-center bg-white px-6 py-12">
    <div class="mx-auto w-full max-w-sm">
      <!-- 헤더 -->
      <div class="mb-8 text-center">
        <h1 class="text-2xl font-semibold text-gray-900">로그인</h1>
      </div>

      <!-- 로그인 폼 -->
      <div>
        <LoginForm
          v-model:username="loginData.id"
          v-model:password="loginData.password"
          :loading="loading"
          @submit="handleLogin"
        />

        <LoginButton :loading="loading" @click="handleLogin" />

        <!-- 하단 링크 -->
        <div class="mt-8 text-center">
          <div class="flex items-center justify-center gap-2">
            <span
              class="cursor-pointer text-sm text-gray-600 transition-colors hover:text-blue-600"
              @click="goToFindAccount"
            >
              아이디 / 비밀번호 찾기
            </span>
            <span class="text-sm text-gray-300">|</span>
            <span
              class="cursor-pointer text-sm text-gray-600 transition-colors hover:text-blue-600"
              @click="goToSignup"
            >
              회원가입
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 에러 토스트 -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="showError"
        class="fixed top-16 left-1/2 z-50 mx-4 max-w-sm -translate-x-1/2 transform rounded-lg bg-red-500 px-6 py-4 font-medium text-white shadow-lg"
      >
        {{ errorMessage }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { login } from '@/services/api/domains/user';
import type { LoginRequest } from '@/services/api/domains/user/types';
import { getUserDataFromToken } from '@/utils/auth';
import LoginForm from '@/components/views/login/LoginForm.vue';
import LoginButton from '@/components/views/login/LoginButton.vue';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

// 로그인 데이터
const loginData = reactive({
  id: '',
  password: '',
});

// 상태 관리
const loading = ref(false);
const showError = ref(false);
const errorMessage = ref('');

// 로그인 처리
const handleLogin = async () => {
  if (!loginData.id || !loginData.password) {
    showErrorToast('아이디와 비밀번호를 입력해주세요.');
    return;
  }

  loading.value = true;

  try {
    // 실제 로그인 API 호출
    const tokens = await login({
      id: loginData.id,
      password: loginData.password,
    } as LoginRequest);

    // 로그인 성공 시 auth store에 저장
    const userData = getUserDataFromToken(tokens.accessToken);
    authStore.setAuth(userData, tokens);

    // 리다이렉트 처리
    const redirectPath = (route.query.redirect as string) || '/';
    router.push(redirectPath);
  } catch (error: unknown) {
    console.log(error.message);
    showErrorToast('로그인에 실패했습니다.');
  } finally {
    loading.value = false;
  }
};

// 에러 토스트 표시
const showErrorToast = (message: string) => {
  errorMessage.value = message;
  showError.value = true;

  setTimeout(() => {
    showError.value = false;
  }, 1000);
};

// 페이지 이동
const goToFindAccount = () => {
  // TODO: 아이디/비밀번호 찾기 페이지로 이동
  console.log('아이디/비밀번호 찾기');
};

const goToSignup = () => {
  router.push('/signup');
};
</script>
