<script setup lang="ts">
const props = defineProps<{
  doneCount: number
  total: number
}>()
</script>

<template>
  <div class="flex items-center gap-2 text-sm text-neutral-400">
    <span
      >완료 <span class="font-medium">{{ props.doneCount }}</span></span
    >
    <span class="text-neutral-600">/</span>
    <span
      >전체 <span class="font-medium">{{ props.total }}</span></span
    >
  </div>
</template>
