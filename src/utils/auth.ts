import { jwtDecode } from 'jwt-decode';
import type { User } from '@/types/type';

interface JwtPayload {
  userId: number;
  loginId: string;
  name: string;
  ssafyNumber: string;
  role: string;
}

export const getUserDataFromToken = (accessToken: string): User => {
  try {
    const payload = jwtDecode<JwtPayload>(accessToken);

    return {
      userId: payload.userId,
      loginId: payload.loginId,
      name: payload.name,
      ssafyNumber: payload.ssafyNumber,
      userRole: payload.role,
    };
  } catch (error) {
    console.error('JWT 디코딩 실패:', error);
    throw new Error('유효하지 않은 토큰입니다.');
  }
};
