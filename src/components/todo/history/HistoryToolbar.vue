<script setup lang="ts">
import TrashIcon from "@/assets/icons/trash.svg"

const props = defineProps<{
  total: number
  selectedCount: number
  allSelected: boolean
}>()

const emit = defineEmits<{
  (e: "toggle-select-all"): void
  (e: "purge-selected"): void
  (e: "purge-all"): void
}>()

const onToggleSelectAll = () => emit("toggle-select-all")
const onPurgeSelected = () => emit("purge-selected")
const onPurgeAll = () => emit("purge-all")

const onClickDelete = () => {
  if (props.selectedCount === 0) return
  if (props.allSelected) onPurgeAll()
  else onPurgeSelected()
}
</script>

<template>
  <div class="flex items-center justify-between rounded-lg">
    <div class="flex items-center gap-3 text-sm text-neutral-200">
      <button
        type="button"
        class="inline-flex h-5 w-5 items-center justify-center rounded border focus:ring-2 focus:ring-red-300/70 focus:outline-none"
        :class="{
          'border-red-300 bg-red-500/15': allSelected,
          'border-neutral-700': !allSelected,
        }"
        role="checkbox"
        :aria-checked="allSelected"
        @click="onToggleSelectAll"
      >
        <span v-if="allSelected" class="text-xs text-red-300">✓</span>
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
        @click="onClickDelete"
      >
        <TrashIcon class="h-4 w-4" />
        <span class="font-medium"> {{ allSelected ? "전체 삭제" : "선택 삭제" }}</span>
      </button>
    </div>
  </div>
</template>
