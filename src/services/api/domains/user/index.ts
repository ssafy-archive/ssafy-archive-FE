import { USER } from '../../endpoint';
import api from '../../api';
import type { ApiResponse } from '../../types';
import type {
  LoginRequest,
  LogoutRequest,
  SigninRequest,
  UserUpdateRequest,
  UserUpdatePasswordRequest,
  LoginResponse,
  SigninResponse,
  UserResponse,
  LogoutResponse,
  SignoutResponse,
  UpdateResponse
} from './types';

/**
 * 사용자 로그인 
 * @param data 로그인 요청 데이터
 * @returns 로그인 응답(토큰 정보)
 */
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<ApiResponse<LoginResponse>>(USER.LOGIN, data);
    return response.data.body;
}

/**
 * 사용자 로그아웃
 * @param data 토큰 정보 
 * @returns 로그아웃 성공 여부 
 */
export const logout = async (data: LogoutRequest): Promise<LogoutResponse> => {
    const response = await api.post<ApiResponse<LogoutResponse>>(USER.LOGOUT, data);
    return response.data.body;
}

/**
 * 회원가입 
 * @param data 생성 요청 데이터 
 * @returns 회원가입 응답 
 */
export const createUser = async (data: SigninRequest): Promise<SigninResponse> => {
    const response = await api.post<ApiResponse<SigninResponse>>(USER.CREATE_USER, data);
    return response.data.body;
}

/**
 * 특정 사용자 조회 
 * @param userId 사용자 id
 * @returns 사용자 정보 
 */
export const getUser = async (userId: number): Promise<UserResponse> => {
    const response = await api.get<ApiResponse<UserResponse>>(USER.GET_USER(userId));
    return response.data.body;
}

/**
 * 특정 사용자 정보 업데이트
 * @param userId 사용자 id
 * @param data 업데이트할 사용자 정보
 * @returns 업데이트 성공 여부 
 */
export const updateUser = async (userId: number, data: UserUpdateRequest): Promise<UpdateResponse> => {
    const response = await api.put<ApiResponse<UpdateResponse>>(USER.UPDATE_USER(userId), data);
    return response.data.body;
}

/**
 * 특정 사용자 비밀번호 업데이트
 * @param userId 사용자 id
 * @param data 업데이트할 비밀번호 정보
 * @returns 업데이트 성공 여부 
 */
export const updateUserPassword = async (userId: number, data: UserUpdatePasswordRequest): Promise<UpdateResponse> => {
    const response = await api.put<ApiResponse<UpdateResponse>>(USER.UPDATE_PASSWORD(userId), data);
    return response.data.body;
}

/**
 * 회원탈퇴 
 * @param userId 사용자 id
 * @returns 회원탈퇴 성공 여부 
 */
export const deleteUser = async (userId: number): Promise<SignoutResponse> => {
    const response = await api.delete<ApiResponse<SignoutResponse>>(USER.DELETE_USER(userId));
    return response.data.body;
}