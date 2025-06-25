<template>
  <div class="flex min-h-screen flex-col justify-center bg-white px-6 py-12">
    <div class="mx-auto w-full max-w-sm">
      <!-- 헤더 -->
      <div class="mb-8 flex items-center">
        <button
          @click="goBack"
          class="mr-4 cursor-pointer text-gray-600 transition-colors hover:text-gray-800"
        >
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <h1 class="text-2xl font-semibold text-gray-900">회원가입</h1>
      </div>

      <!-- 회원가입 폼 -->
      <div>
        <form @submit.prevent="handleSignin">
          <!-- 아이디 -->
          <AuthForm
            v-model="signinData.loginId"
            type="text"
            placeholder="아이디"
            label="아이디"
            autocomplete="username"
            :loading="loading"
            :error="touched.loginId ? errors.loginId : ''"
            :auto-focus="true"
            @enter="focusPassword"
            @update:modelValue="handleLoginIdChange"
            @blur="handleLoginIdBlur"
            ref="loginIdRef"
          />

          <!-- 비밀번호 -->
          <AuthForm
            v-model="signinData.password"
            type="password"
            placeholder="비밀번호"
            label="비밀번호"
            autocomplete="new-password"
            :loading="loading"
            :error="touched.password ? errors.password : ''"
            @enter="focusPasswordConfirm"
            @update:modelValue="handlePasswordChange"
            @blur="handlePasswordBlur"
            ref="passwordRef"
          />

          <!-- 비밀번호 확인 -->
          <AuthForm
            v-model="signinData.passwordConfirm"
            type="password"
            placeholder="비밀번호 확인"
            autocomplete="new-password"
            :loading="loading"
            :error="touched.passwordConfirm ? errors.passwordConfirm : ''"
            @enter="focusName"
            @update:modelValue="handlePasswordConfirmChange"
            @blur="handlePasswordConfirmBlur"
            ref="passwordConfirmRef"
          />

          <!-- 닉네임 -->
          <AuthForm
            v-model="signinData.name"
            type="text"
            placeholder="닉네임"
            label="닉네임"
            autocomplete="name"
            :loading="loading"
            :error="touched.name ? errors.name : ''"
            @enter="focusSsafyNumber"
            @update:modelValue="handleNameChange"
            @blur="handleNameBlur"
            ref="nameRef"
          />

          <!-- 싸피 학번 -->
          <AuthForm
            v-model="signinData.ssafyNumber"
            type="text"
            placeholder="싸피 학번"
            label="싸피 학번"
            :loading="loading"
            :error="touched.ssafyNumber ? errors.ssafyNumber : ''"
            @enter="handleSignin"
            @update:modelValue="handleSsafyNumberChange"
            @blur="handleSsafyNumberBlur"
            ref="ssafyNumberRef"
          />
        </form>

        <AuthButton
          text="가입하기"
          :loading="loading"
          :disabled="!isFormValid"
          @click="handleSignin"
        />

        <!-- 하단 링크 -->
        <div class="mt-8 text-center">
          <span class="text-sm text-gray-600">이미 계정이 있으신가요?</span>
          <span
            class="cursor-pointer text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
            @click="goToLogin"
          >
            로그인하기
          </span>
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
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { createUser } from '@/services/api/domains/user';
import type { SigninRequest } from '@/services/api/domains/user/types';
import {
  validateLoginId,
  validatePassword,
  validatePasswordConfirm,
  validateName,
  validateSsafyNumber,
  validateSigninForm,
} from '@/utils/validation';
import AuthForm from '@/components/common/AuthForm.vue';
import AuthButton from '@/components/common/AuthButton.vue';

const router = useRouter();

// 회원가입 데이터
const signinData = reactive({
  loginId: '',
  password: '',
  passwordConfirm: '',
  name: '',
  ssafyNumber: '',
});

// 상태 관리
const loading = ref(false);
const showError = ref(false);
const errorMessage = ref('');

// 에러 상태 (개별적으로 관리)
const errors = reactive({
  loginId: '',
  password: '',
  passwordConfirm: '',
  name: '',
  ssafyNumber: '',
});

// 필드별 touched 상태 (사용자가 건드렸는지 여부)
const touched = reactive({
  loginId: false,
  password: false,
  passwordConfirm: false,
  name: false,
  ssafyNumber: false,
});

// 폼 참조들
const loginIdRef = ref();
const passwordRef = ref();
const passwordConfirmRef = ref();
const nameRef = ref();
const ssafyNumberRef = ref();

// 개별 필드 검증 함수들
const validateLoginIdField = () => {
  const result = validateLoginId(signinData.loginId);
  errors.loginId = result.isValid ? '' : result.message || '';
};

const validatePasswordField = () => {
  const result = validatePassword(signinData.password);
  errors.password = result.isValid ? '' : result.message || '';

  // 비밀번호가 변경되면 비밀번호 확인도 다시 검증 (이미 입력된 경우)
  if (touched.passwordConfirm && signinData.passwordConfirm) {
    validatePasswordConfirmField();
  }
};

const validatePasswordConfirmField = () => {
  const result = validatePasswordConfirm(signinData.password, signinData.passwordConfirm);
  errors.passwordConfirm = result.isValid ? '' : result.message || '';
};

const validateNameField = () => {
  const result = validateName(signinData.name);
  errors.name = result.isValid ? '' : result.message || '';
};

const validateSsafyNumberField = () => {
  const result = validateSsafyNumber(signinData.ssafyNumber);
  errors.ssafyNumber = result.isValid ? '' : result.message || '';
};

// 각 필드별 입력 핸들러 (touched 상태 업데이트 + 검증)
const handleLoginIdChange = () => {
  touched.loginId = true;
  validateLoginIdField();
};

const handlePasswordChange = () => {
  touched.password = true;
  validatePasswordField();
};

const handlePasswordConfirmChange = () => {
  touched.passwordConfirm = true;
  validatePasswordConfirmField();
};

const handleNameChange = () => {
  touched.name = true;
  validateNameField();
};

const handleSsafyNumberChange = () => {
  touched.ssafyNumber = true;
  validateSsafyNumberField();
};

// blur 이벤트 핸들러들 (함수 이름 충돌 방지)
const handleLoginIdBlur = () => {
  touched.loginId = true;
  validateLoginIdField();
};

const handlePasswordBlur = () => {
  touched.password = true;
  validatePasswordField();
};

const handlePasswordConfirmBlur = () => {
  touched.passwordConfirm = true;
  validatePasswordConfirmField();
};

const handleNameBlur = () => {
  touched.name = true;
  validateNameField();
};

const handleSsafyNumberBlur = () => {
  touched.ssafyNumber = true;
  validateSsafyNumberField();
};

// 폼 유효성 검사 (전체)
const isFormValid = computed(() => {
  const validation = validateSigninForm(signinData);
  return validation.isValid;
});

// 포커스 이동 함수들
const focusPassword = () => {
  passwordRef.value?.focus();
};

const focusPasswordConfirm = () => {
  passwordConfirmRef.value?.focus();
};

const focusName = () => {
  nameRef.value?.focus();
};

const focusSsafyNumber = () => {
  ssafyNumberRef.value?.focus();
};

// 회원가입 처리
const handleSignin = async () => {
  // 모든 필드를 touched로 표시
  Object.keys(touched).forEach(key => {
    touched[key] = true;
  });

  // 모든 필드 검증
  validateLoginIdField();
  validatePasswordField();
  validatePasswordConfirmField();
  validateNameField();
  validateSsafyNumberField();

  if (!isFormValid.value) {
    const firstError =
      Object.values(errors).find(error => error) || '모든 필드를 올바르게 입력해주세요.';
    showErrorToast(firstError);
    return;
  }

  loading.value = true;

  try {
    console.log('회원가입 시도:', {
      loginId: signinData.loginId,
      name: signinData.name,
      ssafyNumber: signinData.ssafyNumber,
    });

    await createUser({
      loginId: signinData.loginId,
      password: signinData.password,
      name: signinData.name,
      ssafyNumber: signinData.ssafyNumber,
    } as SigninRequest);

    console.log('회원가입 성공');
    router.push('/login');
  } catch (error: unknown) {
    console.error('회원가입 에러:', error);

    const message = '회원가입에 실패했습니다.';
    showErrorToast(message);
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
const goBack = () => {
  router.go(-1);
};

const goToLogin = () => {
  router.push('/login');
};
</script>
