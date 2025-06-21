import type { AuthToken, User } from '@/types/type';
import { defineStore } from 'pinia';
import type { PersistenceOptions } from 'pinia-plugin-persistedstate';

interface AuthState {
  user: User | null;
  token: AuthToken | null;
  isAuthenticated: boolean;
}

/**
 * 사용자 정보 전역 store
 */
export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    isAuthenticated: false,
  }),

  getters: {
    getUser: state => state.user,
    getAccessToken: state => state.token?.accessToken || null,
    getRefreshToken: state => state.token?.refreshToken || null,
    getIsAuthenticated: state => state.isAuthenticated,
  },

  actions: {
    setAuth(userData: User, tokens: AuthToken) {
      this.user = userData;
      this.token = tokens;
      this.isAuthenticated = true;
    },

    clearAuth() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
    },

    updateTokens(tokens: AuthToken) {
      this.token = tokens;
    },
  },

  persist: {
    key: 'auth',
    storage: sessionStorage,
    paths: ['token', 'isAuthenticated'],
  } as PersistenceOptions<AuthState>,
});
