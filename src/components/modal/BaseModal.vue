<template>
  <Dialog :open="modelValue" @update:open="updateOpen" :modal="!persistent">
    <DialogContent :class="sizeClasses" :closeButton="showCloseButton">
      <!-- 헤더 슬롯 -->
      <DialogHeader v-if="$slots.header">
        <slot name="header"></slot>
      </DialogHeader>

      <!-- 기본 내용 슬롯 -->
      <slot></slot>

      <!-- 푸터 슬롯 -->
      <DialogFooter v-if="$slots.footer">
        <slot name="footer"></slot>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Dialog from '@/components/ui/dialog/Dialog.vue';
import DialogContent from '@/components/ui/dialog/DialogContent.vue';
import DialogHeader from '@/components/ui/dialog/DialogHeader.vue';
import DialogFooter from '@/components/ui/dialog/DialogFooter.vue';

const props = defineProps({
  /**
   * Controls whether the dialog is open or closed
   * @default false
   */
  modelValue: {
    type: Boolean,
    default: false,
  },
  
  /**
   * The size of the dialog
   * @default 'md'
   */
  size: {
    type: String,
    default: 'md',
    validator: (value: string) => ['sm', 'md', 'lg', 'xl', '2xl'].includes(value),
  },
  
  /**
   * When true, prevents closing the dialog when clicking outside
   * @default false
   */
  persistent: {
    type: Boolean,
    default: false,
  },
  
  /**
   * Show or hide the close button
   * @default true
   */
  showCloseButton: {
    type: Boolean,
    default: true,
  }
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm': return 'max-w-sm';
    case 'lg': return 'max-w-lg';
    case 'xl': return 'max-w-xl';
    case '2xl': return 'max-w-2xl';
    default: return 'max-w-md';
  }
});

const emit = defineEmits(['update:modelValue', 'close']);

// Update modal state when Dialog emits update:open
const updateOpen = (open: boolean) => {
  emit('update:modelValue', open);
  if (!open) {
    emit('close');
  }
};
</script>