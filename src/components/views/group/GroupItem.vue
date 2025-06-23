<template>
    <Card class="w-full max-w-xs cursor-pointer hover:shadow-lg transition-shadow duration-300">
        <CardContent class="flex items-center justify-center h-32 text-center text-sm font-semibold">
        {{ title }}
        </CardContent>
    </Card>
</template>

<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card';

defineProps({
title: String
});
</script>
