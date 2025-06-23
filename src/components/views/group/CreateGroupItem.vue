<template>
    <Card
      class="w-full max-w-xs h-32 flex items-center justify-center bg-muted cursor-pointer hover:shadow-lg transition"
    >
      <CardContent class="flex flex-col items-center justify-center text-muted-foreground">
        <Plus class="w-8 h-8 mb-1" />
        <span class="text-sm font-medium">그룹 생성</span>
      </CardContent>
    </Card>
  </template>
  
  <script setup lang="ts">
  import { Card, CardContent } from '@/components/ui/card';
  import { Plus } from 'lucide-vue-next';
  </script>
  