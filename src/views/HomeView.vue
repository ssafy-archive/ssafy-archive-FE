<template>
  <main class="flex min-h-screen flex-col items-center justify-center gap-4 bg-blue-100">
    <!-- 사용자 인사말 -->
    <div v-if="user" class="mb-8 text-center">
      <h1 class="mb-2 text-3xl font-bold text-blue-800">
        {{ user.name || user.username }}님 안녕하세요!
      </h1>
      <div class="text-lg text-blue-600">
        <p>SSAFY {{ user.ssafyNumber }}기</p>
        <p class="mt-1 text-sm text-blue-500">{{ user.role }}</p>
      </div>
    </div>

    <!-- 로그아웃 버튼 -->
    <button
      @click="handleLogout"
      class="mt-8 cursor-pointer rounded-lg bg-red-500 px-6 py-2 text-white transition-colors hover:bg-red-600"
    >
      로그아웃
    </button>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { logout } from '@/services/api/domains/user';

const router = useRouter();
const authStore = useAuthStore();

// 사용자 정보 가져오기
const user = computed(() => authStore.getUser);

// 로그아웃 처리
const handleLogout = async () => {
  try {
    const refreshToken = authStore.getRefreshToken;

    if (refreshToken) {
      // 서버에 로그아웃 요청 (토큰 블랙리스트 추가)
      await logout({ refreshToken });
    }

    // 클라이언트 상태 정리
    authStore.clearAuth();

    // 로그인 페이지로 리다이렉트
    router.push('/login');
  } catch (error) {
    console.error('로그아웃 에러:', error);

    // 서버 에러가 있어도 클라이언트는 로그아웃 처리
    authStore.clearAuth();
    router.push('/login');
  }
};
</script>
