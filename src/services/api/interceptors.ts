import {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  AxiosError,
} from 'axios';
import { useAuthStore } from '@/stores/auth';
import { type ApiErrorResponse } from './types';

/**
 * HTTP API 인터셉터 설정
 * @param api - Axios 인스턴스
 */
export const setupInterceptors = (api: AxiosInstance): void => {
  /**
   * 요청 인터셉터 설정
   */
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      const authStore = useAuthStore();
      const token = authStore.getAccessToken;

      if (token) {
        config.headers.Authorization = `${token}`;
      }

      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  /**
   * 응답 인터셉터 설정
   */
  api.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: AxiosError<ApiErrorResponse>) => {
      const authStore = useAuthStore();

      if (error.response) {
        switch (error.response.status) {
          case 401:
          case 403:
            authStore.clearAuth();
            // 로그인 페이지로 리다이렉션 로직 추가
            break;
        }
      } else if (error.request) {
        // 요청은 전송됐지만 응답을 받지 못한 경우 (타임아웃, 네트워크 오류 등)
      } else {
        // 요청 설정 과정에서 오류가 발생한 경우
      }

      return Promise.reject(error);
    }
  );
};
