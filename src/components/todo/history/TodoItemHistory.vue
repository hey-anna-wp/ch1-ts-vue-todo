<script setup lang="ts">
import type { Todo } from "@/types/todo"
import IconButton from "@/components/ui/IconButton.vue"
import TrashIcon from "@/assets/icons/trash.svg"
import RestoreIcon from "@/assets/icons/restore.svg"
import TodoItemLayout from "@/components/todo/common/TodoItemLayout.vue"
import TodoStatusBadge from "@/components/todo/common/TodoStatusBadge.vue"

const props = defineProps<{
  todo: Todo
  selected: boolean
}>()

const emit = defineEmits<{
  (e: "toggleSelect", id: Todo["id"]): void
  (e: "restore", id: Todo["id"]): void
  (e: "purge", id: Todo["id"]): void
}>()
</script>

<template>
  <TodoItemLayout :rightGap="false">
    <template #left>
      <button
        type="button"
        class="inline-flex h-5 w-5 items-center justify-center rounded border focus:ring-2 focus:ring-red-300/70 focus:outline-none"
        :class="props.selected ? 'border-red-300 bg-red-500/15' : 'border-neutral-700'"
        role="checkbox"
        :aria-checked="props.selected"
        @click="emit('toggleSelect', props.todo.id)"
        @keydown.enter.prevent="emit('toggleSelect', props.todo.id)"
        @keydown.space.prevent="emit('toggleSelect', props.todo.id)"
      >
        <span v-if="props.selected" class="text-xs text-red-300">✓</span>
      </button>

      <span
        class="truncate text-sm"
        :class="props.todo.done ? 'text-neutral-400 line-through' : 'text-neutral-200'"
      >
        {{ props.todo.title }}
      </span>
    </template>

    <template #right>
      <TodoStatusBadge :done="props.todo.done" />

      <IconButton
        ariaLabel="복구"
        title="복구"
        @click="emit('restore', props.todo.id)"
        variant="restore"
      >
        <RestoreIcon />
      </IconButton>
      <IconButton
        ariaLabel="삭제"
        title="삭제"
        @click="emit('purge', props.todo.id)"
        variant="danger"
      >
        <TrashIcon class="h-6 w-6" />
      </IconButton>
    </template>
  </TodoItemLayout>
</template>
