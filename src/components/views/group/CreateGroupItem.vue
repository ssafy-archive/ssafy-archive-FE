<template>
  <Card
    class="bg-muted flex h-32 w-full max-w-xs cursor-pointer items-center justify-center transition hover:shadow-lg"
  >
    <CardContent class="text-muted-foreground flex flex-col items-center justify-center">
      <Plus class="mb-1 h-8 w-8" />
      <span class="text-sm font-medium">그룹 생성</span>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-vue-next';
</script>
