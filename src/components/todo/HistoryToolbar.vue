<script setup lang="ts">
import TrashIcon from "@/assets/icons/trash.svg"

const props = defineProps<{
  total: number
  selectedCount: number
  allSelected: boolean
}>()

const emit = defineEmits<{
  (e: "toggleSelectAll"): void
  (e: "purgeSelected"): void
}>()

const onToggleSelectAll = () => emit("toggleSelectAll")
const onPurgeSelected = () => emit("purgeSelected")
</script>

<template>
  <div class="flex items-center justify-between rounded-lg">
    <div class="flex items-center gap-3 text-sm text-neutral-200">
      <button
        type="button"
        class="inline-flex h-5 w-5 items-center justify-center rounded border focus:ring-2 focus:ring-emerald-500/40 focus:outline-none"
        :class="{
          'border-emerald-500 bg-emerald-500/20': allSelected,
          'border-neutral-700': !allSelected,
        }"
        role="checkbox"
        :aria-checked="allSelected"
        @click="onToggleSelectAll"
      >
        <span v-if="allSelected" class="text-xs text-emerald-400">✓</span>
      </button>

      <span class="min-w-12 text-sm text-neutral-400"> 선택 {{ selectedCount }}</span>

      <button
        type="button"
        class="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm transition disabled:pointer-events-none disabled:opacity-40"
        :class="{
          'text-neutral-300 hover:bg-red-500/10 hover:text-red-300': selectedCount > 0,
          'text-neutral-500': selectedCount === 0,
        }"
        :disabled="selectedCount === 0"
        @click="onPurgeSelected"
      >
        <TrashIcon class="h-4 w-4" />
        <span class="font-medium">삭제</span>
      </button>
    </div>
    <button type="button" class="text-neutral-300 hover:text-neutral-100">sort</button>
  </div>
</template>
