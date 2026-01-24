<script setup lang="ts">
import type { Todo } from "@/types/todo"
import TodoList from "./TodoList.vue"
import TodoItemHome from "./TodoItemHome.vue"

const props = defineProps<{
  todos: Todo[]
  doneCount: number
  total: number
}>()

const emit = defineEmits<{
  (e: "toggleDone", id: Todo["id"]): void
  (e: "archive", id: Todo["id"]): void
}>()
</script>

<template>
  <TodoList :done-count="props.doneCount" :total="props.total">
    <TodoItemHome
      v-for="todo in props.todos"
      :key="todo.id"
      :todo="todo"
      @toggle-done="emit('toggleDone', $event)"
      @archive="emit('archive', $event)"
    />
  </TodoList>
</template>
