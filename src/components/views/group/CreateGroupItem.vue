<template>
  <Card class="w-full max-w-xs cursor-pointer transition-shadow duration-300 hover:shadow-lg">
    <CardContent class="flex h-32 items-center justify-center text-center text-sm font-semibold">
      <Plus class="mb-1 h-8 w-8" />
      <span class="text-sm font-medium">그룹 생성</span>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-vue-next';
</script>
