<template>
  <div class="mb-4">
    <label 
      v-if="label" 
      class="block text-sm font-medium text-gray-700 mb-2"
    >
      {{ label }}
    </label>
    <input
      :value="modelValue"
      @input="handleInput"
      @blur="handleBlur"
      :type="type"
      :placeholder="placeholder"
      class="box-border min-h-[3rem] w-full touch-manipulation rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-4 text-base placeholder-gray-400 transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 sm:min-h-0 sm:py-4"
      :class="{ 
        'border-red-300 bg-red-50 focus:border-red-500 focus:bg-red-50 focus:ring-red-100': error,
        'text-gray-900': !error
      }"
      :disabled="loading"
      :autocomplete="autocomplete"
      @keyup.enter="handleEnter"
      ref="inputRef"
    />
    <p v-if="error" class="mt-1 text-sm text-red-600">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Props {
  modelValue: string
  type: string
  placeholder: string
  label?: string
  autocomplete?: string
  loading?: boolean
  error?: string
  autoFocus?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'enter'): void
  (e: 'blur'): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  autoFocus: false
})

const emit = defineEmits<Emits>()

const inputRef = ref<HTMLInputElement>()

// 입력 처리
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

// Enter 키 처리
const handleEnter = () => {
  emit('enter')
}

// Blur 이벤트 처리
const handleBlur = () => {
  emit('blur')
}

// 포커스 메서드 (외부에서 호출 가능)
const focus = () => {
  inputRef.value?.focus()
}

// 자동 포커스
onMounted(() => {
  if (props.autoFocus) {
    setTimeout(() => {
      focus()
    }, 100)
  }
})

// 외부에서 포커스 메서드 사용할 수 있도록 expose
defineExpose({
  focus
})
</script>