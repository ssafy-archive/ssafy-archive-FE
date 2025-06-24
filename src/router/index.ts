import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('@/views/SigninView.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { requiresAuth: true },
    },
  ],
});

// 라우터 가드
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth) {
    // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
    if (!authStore.isAuthenticated) {
      next({
        name: 'login',
        query: { redirect: to.fullPath },
      });
      return;
    }
  }

  // 로그인된 상태에서 로그인/회원가입 페이지 접근 시 홈으로 리다이렉트
  if ((to.name === 'login' || to.name === 'signin') && authStore.getIsAuthenticated) {
    next({ name: 'home' });
    return;
  }

  next();
});

export default router;
