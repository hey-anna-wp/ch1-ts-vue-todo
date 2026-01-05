<script setup lang="ts">
import TodoItem from "./TodoItem.vue"
import type { Todo } from "@/types/todo"
import TodoSummary from "./TodoSummary.vue"

const { todos, doneCount, total } = defineProps<{
  todos: Todo[]
  doneCount: number
  total: number
}>()
</script>

<template>
  <section class="space-y-3">
    <header class="flex items-end justify-between">
      <h2 class="text-base font-semibold text-neutral-100">Todo</h2>
      <!-- <p class="text-xs text-neutral-400">총 {{ props.todos.length }}개</p> -->
      <TodoSummary :done-count="doneCount" :total="total" />
    </header>
    <ul class="space-y-2">
      <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" />
    </ul>
    <p
      v-if="todos.length === 0"
      class="rounded-lg border border-neutral-800 bg-neutral-900 p-4 text-sm text-neutral-400"
    >
      할 일이 없습니다.
    </p>
  </section>
</template>
