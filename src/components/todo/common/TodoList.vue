<script setup lang="ts">
import TodoSummary from "@/components/todo/home/TodoSummary.vue"
import SortToggle from "@/components/todo/common/SortToggle.vue"
import Pagination from "@/components/ui/Pagination.vue"
import type { SortOrder } from "@/types/todo"

const props = withDefaults(
  defineProps<{
    doneCount?: number
    total: number
    emptyText?: string
    sortOrder?: SortOrder
    page?: number
    totalPages?: number
    canPrev?: boolean
    canNext?: boolean
    rangeText?: string
  }>(),
  {
    emptyText: "할 일이 없습니다.",
  },
)

const emit = defineEmits<{
  (e: "toggle-sort"): void
  (e: "set-page", page: number): void
  (e: "prev-page"): void
  (e: "next-page"): void
}>()
</script>

<template>
  <section class="space-y-3">
    <header class="flex min-h-7 justify-between">
      <!-- left -->
      <div class="flex min-w-0 items-center gap-2">
        <slot name="toolbar" />
      </div>
      <!-- right -->
      <div class="flex shrink-0 items-center gap-3">
        <SortToggle v-if="sortOrder" :order="sortOrder" @toggle="emit('toggle-sort')" />
        <TodoSummary :done-count="doneCount" :total="total" />
      </div>
    </header>

    <!-- list -->
    <ul v-if="total > 0" class="space-y-2">
      <slot />
    </ul>

    <p
      v-else
      class="rounded-lg border border-neutral-800 bg-neutral-900 p-4 text-sm text-neutral-400"
    >
      {{ emptyText }}
    </p>

    <Pagination
      v-if="total > 0 && (totalPages ?? 1) > 1"
      :current-page="page ?? 1"
      :total-pages="totalPages ?? 1"
      :can-prev="canPrev ?? false"
      :can-next="canNext ?? false"
      :range-text="rangeText ?? ''"
      @set="emit('set-page', $event)"
      @prev="emit('prev-page')"
      @next="emit('next-page')"
    />
  </section>
</template>
