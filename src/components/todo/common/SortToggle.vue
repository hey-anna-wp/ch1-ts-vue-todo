<script setup lang="ts">
import type { SortOrder } from "@/types/todo"
import SortArrowsIcon from "@/assets/icons/sort-arrows.svg"

const { order } = defineProps<{ order: SortOrder }>()
const emit = defineEmits<{ (e: "toggle"): void }>()
</script>

<template>
  <button
    type="button"
    class="flex items-center gap-1 text-sm text-neutral-300 transition hover:text-neutral-100"
    :aria-label="order === 'asc' ? '내림차순으로 정렬' : '오름차순으로 정렬'"
    @click="emit('toggle')"
  >
    <SortArrowsIcon
      class="h-4 w-4 transition-transform"
      :class="{ 'rotate-180': order !== 'asc' }"
      aria-hidden="true"
    />
  </button>
</template>
