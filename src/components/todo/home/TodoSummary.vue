<script setup lang="ts">
const props = defineProps<{
  doneCount?: number
  total: number
}>()
</script>

<template>
  <div class="flex items-center gap-2 text-sm text-neutral-400">
    <template v-if="doneCount !== undefined">
      <span
        >완료 <span class="font-medium">{{ doneCount }}</span></span
      >
      <span class="text-neutral-600">/</span>
    </template>
    <span
      >전체 <span class="font-medium">{{ total }}</span></span
    >
  </div>
</template>
