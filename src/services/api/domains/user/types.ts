import type { User, AuthToken } from '@/types/type';

export type LoginRequest = {
    id: string;
    password: string;
}

export type LogoutRequest = {
    refreshToken: string;
}

export type SigninRequest = {
    loginId: string;
    password: string;
    name: string;
    ssafyNumber: string;
}

export type UserUpdateRequest = {
    name?: string;
    ssafyNumber?: string;
}

export type UserUpdatePasswordRequest = {
    oldPassword: string;
    newPassword: string;
}

export type LoginResponse = AuthToken;
export type SigninResponse = User;
export type UserResponse = User;

type SuccessResponse = {
  success: boolean;
};

export type LogoutResponse = SuccessResponse;
export type SignoutResponse = SuccessResponse;
export type UpdateResponse = SuccessResponse;