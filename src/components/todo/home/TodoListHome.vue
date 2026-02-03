<script setup lang="ts">
import { computed } from "vue"
import type { EditTodoPayload, Todo } from "@/types/todo"
import TodoList from "@/components/todo/common/TodoList.vue"
import TodoItemHome from "./TodoItemHome.vue"
import { sortTodos } from "@/utils/sortTodos"
import { useSortOrder } from "@/composables/useSortOrder"

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

const { sortOrder, toggleSortOrder } = useSortOrder("desc")
const sortedTodos = computed(() => sortTodos(props.todos, sortOrder.value))
</script>

<template>
  <TodoList
    :done-count="doneCount"
    :total="total"
    :sort-order="sortOrder"
    @toggle-sort="toggleSortOrder"
  >
    <TodoItemHome
      v-for="todo in sortedTodos"
      :key="todo.id"
      :todo="todo"
      @toggle-done="emit('toggle-done', $event)"
      @archive="emit('archive', $event)"
      @edit="emit('edit', $event)"
    />
  </TodoList>
</template>
