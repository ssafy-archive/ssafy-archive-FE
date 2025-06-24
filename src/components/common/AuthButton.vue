<template>
  <button
    type="button"
    class="relative mt-4 min-h-[3.5rem] w-full overflow-hidden rounded-xl border-0 px-4 py-4 text-lg font-semibold text-white transition-all duration-200 sm:min-h-0 sm:py-4"
    :class="[
      disabled || loading
        ? 'bg-gray-400'
        : 'cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 hover:-translate-y-0.5 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg hover:shadow-blue-500/30 active:translate-y-0 active:shadow-md active:shadow-blue-500/30',
      { 'pointer-events-none': loading },
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <div
      v-if="loading"
      class="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"
    ></div>
    <span v-else>{{ text }}</span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  text: string;
  loading?: boolean;
  disabled?: boolean;
}

interface Emits {
  (e: 'click'): void;
}

withDefaults(defineProps<Props>(), {
  loading: false,
  disabled: false,
});

const emit = defineEmits<Emits>();

const handleClick = () => {
  emit('click');
};
</script>
