<script setup lang="ts">
import TodoSummary from "./TodoSummary.vue"

const props = defineProps<{
  doneCount?: number
  total: number
  emptyText?: string
}>()
</script>

<template>
  <section class="space-y-3">
    <header class="flex items-end justify-end">
      <!-- 메인 화면: 할 일 완료/전체 개수 표시 -->
      <TodoSummary
        v-if="props.doneCount !== undefined"
        :done-count="props.doneCount"
        :total="props.total"
      />
      <!-- 히스토리 화면: 전체 개수만 표시 -->
      <span v-else class="text-sm text-neutral-400"
        >전체 <span class="font-medium">{{ props.total }}</span>
      </span>
    </header>
    <!-- sort / 선택삭제 타입 여기로 -->
    <slot name="toolbar" />
    <!-- 할 일 목록 -->
    <ul v-if="props.total > 0" class="space-y-2">
      <slot />
    </ul>

    <p
      v-else
      class="rounded-lg border border-neutral-800 bg-neutral-900 p-4 text-sm text-neutral-400"
    >
      {{ props.emptyText ?? "할 일이 없습니다." }}
    </p>
  </section>
</template>
