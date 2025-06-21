export type ApiResponse<T> = {
  code: number;
  body: T;
};

export type ApiErrorBody = {
  code: string;
  message: string;
};

export type ApiErrorResponse = ApiResponse<ApiErrorBody>;

export type CommonSuccessBody = {
  success: boolean;
};
