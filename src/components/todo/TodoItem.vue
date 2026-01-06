<script setup lang="ts">
import type { Todo } from "@/types/todo"

const props = defineProps<{
  todo: Todo
}>()

const emit = defineEmits<{
  (e: "toggle", id: Todo["id"]): void
  (e: "remove", id: Todo["id"]): void
}>()

const onToggle = () => emit("toggle", props.todo.id)
</script>

<template>
  <li
    class="flex items-center justify-between gap-3 rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3"
  >
    <div class="flex items-center gap-3">
      <button
        type="button"
        class="inline-flex h-5 w-5 items-center justify-center rounded border focus:ring-2 focus:ring-emerald-500/40 focus:outline-none"
        :class="props.todo.done ? 'border-emerald-500 bg-emerald-500/20' : 'border-neutral-700'"
        role="checkbox"
        :aria-checked="props.todo.done"
        @click="onToggle"
        @keydown.enter.prevent="onToggle"
        @keydown.space.prevent="onToggle"
      >
        <span v-if="props.todo.done" class="text-xs text-emerald-400">✓</span>
      </button>

      <span
        class="text-sm"
        :class="props.todo.done ? 'text-neutral-400 line-through' : 'text-neutral-100'"
      >
        {{ props.todo.title }}
      </span>
    </div>
    <div class="flex items-center gap-2">
      <span
        class="shrink-0 rounded-full px-2 py-1 text-xs"
        :class="
          props.todo.done ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-500/15 text-amber-300'
        "
      >
        {{ props.todo.done ? "완료" : "진행중" }}
      </span>
      <button
        type="button"
        class="rounded-md border border-neutral-800 bg-neutral-950 px-2 py-1 text-xs text-neutral-200"
        @click="emit('remove', props.todo.id)"
      >
        삭제
      </button>
    </div>
  </li>
</template>
