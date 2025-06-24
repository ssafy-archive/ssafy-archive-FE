// 백엔드 유효성 검사 규칙에 맞는 검증 함수들

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

/**
 * 로그인 아이디 유효성 검사
 * - NotBlank
 * - 최대 20자
 * - 3자 이상 (일반적인 아이디 규칙)
 */
export const validateLoginId = (loginId: string): ValidationResult => {
  if (!loginId || loginId.trim() === '') {
    return { isValid: false, message: '아이디를 입력해주세요.' };
  }

  if (loginId.length < 3) {
    return { isValid: false, message: '아이디는 3자 이상이어야 합니다.' };
  }

  if (loginId.length > 20) {
    return { isValid: false, message: '아이디는 20자 이하여야 합니다.' };
  }

  return { isValid: true };
};

/**
 * 비밀번호 유효성 검사
 * - NotBlank
 * - 6자 이상 (보안상 최소 요구사항)
 * - 최대 60자 (데이터베이스 제한)
 */
export const validatePassword = (password: string): ValidationResult => {
  if (!password || password.trim() === '') {
    return { isValid: false, message: '비밀번호를 입력해주세요.' };
  }

  if (password.length < 6) {
    return { isValid: false, message: '비밀번호는 6자 이상이어야 합니다.' };
  }

  if (password.length > 60) {
    return { isValid: false, message: '비밀번호는 60자 이하여야 합니다.' };
  }

  return { isValid: true };
};

/**
 * 비밀번호 확인 유효성 검사
 */
export const validatePasswordConfirm = (
  password: string,
  passwordConfirm: string
): ValidationResult => {
  if (!passwordConfirm || passwordConfirm.trim() === '') {
    return { isValid: false, message: '비밀번호 확인을 입력해주세요.' };
  }

  if (password !== passwordConfirm) {
    return { isValid: false, message: '비밀번호가 일치하지 않습니다.' };
  }

  return { isValid: true };
};

/**
 * 이름(닉네임) 유효성 검사
 * - NotBlank
 * - 최대 20자
 * - 2자 이상 (일반적인 이름 규칙)
 */
export const validateName = (name: string): ValidationResult => {
  if (!name || name.trim() === '') {
    return { isValid: false, message: '닉네임을 입력해주세요.' };
  }

  const trimmedName = name.trim();

  if (trimmedName.length < 2) {
    return { isValid: false, message: '닉네임은 2자 이상이어야 합니다.' };
  }

  if (trimmedName.length > 20) {
    return { isValid: false, message: '닉네임은 20자 이하여야 합니다.' };
  }

  return { isValid: true };
};

/**
 * 싸피 학번 유효성 검사
 * - NotBlank
 * - 정확히 7자리 숫자 (백엔드 @Pattern 규칙)
 */
export const validateSsafyNumber = (ssafyNumber: string): ValidationResult => {
  if (!ssafyNumber || ssafyNumber.trim() === '') {
    return { isValid: false, message: '싸피 학번을 입력해주세요.' };
  }

  const pattern = /^\d{7}$/;
  if (!pattern.test(ssafyNumber)) {
    return { isValid: false, message: '싸피 학번은 7자리 숫자여야 합니다.' };
  }

  return { isValid: true };
};

/**
 * 전체 로그인 폼 유효성 검사
 */
export const validateLoginForm = (data: { id: string; password: string }) => {
  const errors: Record<string, string> = {};

  const loginIdResult = validateLoginId(data.id);
  if (!loginIdResult.isValid) {
    errors.id = loginIdResult.message || '';
  }

  const passwordResult = validatePassword(data.password);
  if (!passwordResult.isValid) {
    errors.password = passwordResult.message || '';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * 전체 회원가입 폼 유효성 검사
 */
export const validateSigninForm = (data: {
  loginId: string;
  password: string;
  passwordConfirm: string;
  name: string;
  ssafyNumber: string;
}) => {
  const errors: Record<string, string> = {};

  const loginIdResult = validateLoginId(data.loginId);
  if (!loginIdResult.isValid) {
    errors.loginId = loginIdResult.message || '';
  }

  const passwordResult = validatePassword(data.password);
  if (!passwordResult.isValid) {
    errors.password = passwordResult.message || '';
  }

  const passwordConfirmResult = validatePasswordConfirm(data.password, data.passwordConfirm);
  if (!passwordConfirmResult.isValid) {
    errors.passwordConfirm = passwordConfirmResult.message || '';
  }

  const nameResult = validateName(data.name);
  if (!nameResult.isValid) {
    errors.name = nameResult.message || '';
  }

  const ssafyNumberResult = validateSsafyNumber(data.ssafyNumber);
  if (!ssafyNumberResult.isValid) {
    errors.ssafyNumber = ssafyNumberResult.message || '';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
