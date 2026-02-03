<script setup lang="ts">
import { computed, watch } from "vue"
import type { EditTodoPayload, Todo } from "@/types/todo"
import TodoList from "@/components/todo/common/TodoList.vue"
import TodoItemHome from "./TodoItemHome.vue"
import { sortTodos } from "@/utils/sortTodos"
import { useSortOrder } from "@/composables/useSortOrder"
import { usePagination } from "@/composables/usePagination"

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

const { pagedItems, currentPage, totalPages, canPrev, canNext, rangeText, setPage, prev, next } =
  usePagination<Todo>(sortedTodos, {
    pageSize: 10,
    resetPageOnItemsChange: true,
  })

watch(sortOrder, () => setPage(1))
</script>

<template>
  <TodoList
    :done-count="doneCount"
    :total="total"
    :sort-order="sortOrder"
    @toggle-sort="toggleSortOrder"
    :page="currentPage"
    :total-pages="totalPages"
    :can-prev="canPrev"
    :can-next="canNext"
    :range-text="rangeText"
    @set-page="setPage"
    @prev-page="prev"
    @next-page="next"
  >
    <TodoItemHome
      v-for="todo in pagedItems"
      :key="todo.id"
      :todo="todo"
      @toggle-done="emit('toggle-done', $event)"
      @archive="emit('archive', $event)"
      @edit="emit('edit', $event)"
    />
  </TodoList>
</template>
