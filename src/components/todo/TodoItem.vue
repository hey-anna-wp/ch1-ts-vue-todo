<script setup lang="ts">
import type { Todo } from "@/types/todo"

const props = defineProps<{
  todo: Todo
}>()
</script>

<template>
  <li
    class="flex items-center justify-between gap-3 rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3"
  >
    <div class="flex items-center gap-3">
      <span
        class="inline-flex h-5 w-5 items-center justify-center rounded border"
        :class="props.todo.done ? 'border-emerald-500 bg-emerald-500/20' : 'border-neutral-700'"
        aria-hidden="true"
      >
        <span v-if="props.todo.done" class="text-xs text-emerald-400">✓</span>
      </span>

      <span
        class="text-sm"
        :class="props.todo.done ? 'text-neutral-400 line-through' : 'text-neutral-100'"
      >
        {{ props.todo.title }}
      </span>
    </div>

    <span
      class="shrink-0 rounded-full px-2 py-1 text-xs"
      :class="
        props.todo.done ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-500/15 text-amber-300'
      "
    >
      {{ props.todo.done ? "완료" : "진행중" }}
    </span>
  </li>
</template>
