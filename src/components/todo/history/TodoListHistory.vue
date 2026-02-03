<script setup lang="ts">
import { computed, ref, watch } from "vue"
import type { Todo } from "@/types/todo"
import TodoList from "@/components/todo/common/TodoList.vue"
import HistoryToolbar from "./HistoryToolbar.vue"
import TodoItemHistory from "./TodoItemHistory.vue"
import { sortTodos } from "@/utils/sortTodos"
import { useSortOrder } from "@/composables/useSortOrder"
import { usePagination } from "@/composables/usePagination"

const props = defineProps<{ todos: Todo[] }>()
const emit = defineEmits<{
  (e: "restore", id: Todo["id"]): void
  (e: "purge", id: Todo["id"]): void
  (e: "purge-many", ids: Todo["id"][]): void
  (e: "purge-all"): void
}>()

const { sortOrder, toggleSortOrder } = useSortOrder("desc")
const sortedTodos = computed(() => sortTodos(props.todos, sortOrder.value))

const selectedIds = ref<Set<Todo["id"]>>(new Set())

const { pagedItems, currentPage, totalPages, canPrev, canNext, rangeText, setPage, prev, next } =
  usePagination<Todo>(sortedTodos, {
    pageSize: 10,
    resetPageOnItemsChange: true,
  })

watch(sortOrder, () => setPage(1))

watch(
  () => props.todos.map((t) => t.id),
  (ids: Todo["id"][]) => {
    const idSet = new Set<Todo["id"]>(ids)
    const next = new Set<Todo["id"]>()

    for (const id of selectedIds.value) {
      if (idSet.has(id)) next.add(id)
    }
    selectedIds.value = next
  },
)

const total = computed(() => props.todos.length)
const selectedCount = computed(() => selectedIds.value.size)
const allSelected = computed(() => total.value > 0 && selectedCount.value === total.value)

const toggleSelect = (id: Todo["id"]) => {
  const next = new Set(selectedIds.value)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  selectedIds.value = next
}

const toggleSelectAll = () => {
  if (allSelected.value) {
    selectedIds.value = new Set()
    return
  }
  selectedIds.value = new Set(props.todos.map((t) => t.id))
}

const purgeSelected = () => {
  const ids: Todo["id"][] = [...selectedIds.value]
  if (ids.length === 0) return
  emit("purge-many", ids)
  selectedIds.value = new Set()
}

const purgeAll = () => {
  if (total.value === 0) return
  emit("purge-all")
  selectedIds.value = new Set()
}
</script>

<template>
  <TodoList
    :total="total"
    empty-text="보관된 할 일이 없습니다."
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
    <template #toolbar>
      <HistoryToolbar
        :total="total"
        :selected-count="selectedCount"
        :all-selected="allSelected"
        @toggle-select-all="toggleSelectAll"
        @purge-selected="purgeSelected"
        @purge-all="purgeAll"
      />
    </template>

    <TodoItemHistory
      v-for="todo in pagedItems"
      :key="todo.id"
      :todo="todo"
      :selected="selectedIds.has(todo.id)"
      @toggle-select="toggleSelect"
      @restore="emit('restore', $event)"
      @purge="emit('purge', $event)"
    />
  </TodoList>
</template>
