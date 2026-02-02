<script setup lang="ts">
import type { EditTodoPayload, Todo } from "@/types/todo"
import TodoList from "@/components/todo/common/TodoList.vue"
import TodoItemHome from "./TodoItemHome.vue"

const props = defineProps<{
  todos: Todo[]
  doneCount: number
  total: number
}>()

const emit = defineEmits<{
  (e: "toggle-done", id: Todo["id"]): void
  (e: "archive", id: Todo["id"]): void
  (e: "edit", payload: EditTodoPayload): void
}>()
</script>

<template>
  <TodoList :done-count="props.doneCount" :total="props.total">
    <TodoItemHome
      v-for="todo in props.todos"
      :key="todo.id"
      :todo="todo"
      @toggle-done="emit('toggle-done', $event)"
      @archive="emit('archive', $event)"
      @edit="emit('edit', $event)"
    />
  </TodoList>
</template>
