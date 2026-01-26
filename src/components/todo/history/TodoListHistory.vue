<script setup lang="ts">
import { computed, ref, watch } from "vue"
import type { Todo } from "@/types/todo"
import TodoList from "@/components/todo/common/TodoList.vue"
import TodoItemHistory from "./TodoItemHistory.vue"
import HistoryToolbar from "./HistoryToolbar.vue"

const props = defineProps<{ todos: Todo[] }>()
const emit = defineEmits<{
  (e: "restore", id: Todo["id"]): void
  (e: "purge", id: Todo["id"]): void
  (e: "purge-many", ids: Todo["id"][]): void
  (e: "purge-all"): void
}>()

const selectedIds = ref<Set<Todo["id"]>>(new Set())

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
  <TodoList :total="total" empty-text="보관된 할 일이 없습니다.">
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
      v-for="todo in props.todos"
      :key="todo.id"
      :todo="todo"
      :selected="selectedIds.has(todo.id)"
      @toggle-select="toggleSelect"
      @restore="emit('restore', $event)"
      @purge="emit('purge', $event)"
    />
  </TodoList>
</template>
