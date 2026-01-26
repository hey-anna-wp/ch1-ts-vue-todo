<script setup lang="ts">
import type { Todo } from "@/types/todo"
import TodoItemLayout from "../common/TodoItemLayout.vue"
import IconButton from "@/components/ui/IconButton.vue"
import ArchiveIcon from "@/assets/icons/archive.svg"

const props = defineProps<{ todo: Todo }>()

const emit = defineEmits<{
  (e: "toggle-done", id: Todo["id"]): void
  (e: "archive", id: Todo["id"]): void
}>()

const onToggle = () => emit("toggle-done", props.todo.id)
</script>

<template>
  <TodoItemLayout>
    <template #left>
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
        class="truncate text-sm"
        :class="props.todo.done ? 'text-neutral-400 line-through' : 'text-neutral-100'"
      >
        {{ props.todo.title }}
      </span>
    </template>

    <template #right>
      <span
        class="shrink-0 rounded-full px-2 py-1 text-xs"
        :class="
          props.todo.done ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-500/15 text-amber-300'
        "
      >
        {{ props.todo.done ? "완료" : "진행중" }}
      </span>

      <IconButton
        ariaLabel="보관"
        title="보관"
        @click="emit('archive', props.todo.id)"
        variant="archive"
      >
        <ArchiveIcon />
      </IconButton>
    </template>
  </TodoItemLayout>
</template>
