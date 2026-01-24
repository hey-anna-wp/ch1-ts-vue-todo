<script setup lang="ts">
import { computed, ref, watch } from "vue"
import type { Todo } from "@/types/todo"
import TodoList from "./TodoList.vue"
import TodoItemHistory from "./TodoItemHistory.vue"
import HistoryToolbar from "./HistoryToolbar.vue"

const props = defineProps<{ todos: Todo[] }>()
const emit = defineEmits<{
  (e: "restore", id: Todo["id"]): void
  (e: "purge", id: Todo["id"]): void
  (e: "purgeMany", ids: Todo["id"][]): void
  (e: "purgeAll"): void
}>()

const selectedIds = ref<Set<string>>(new Set())

watch(
  () => props.todos.map((t) => t.id),
  (ids) => {
    const next = new Set<string>()
    for (const id of selectedIds.value) {
      if (ids.includes(id)) next.add(id)
    }
    selectedIds.value = next
  },
)

const total = computed(() => props.todos.length)
const selectedCount = computed(() => selectedIds.value.size)
const allSelected = computed(() => total.value > 0 && selectedCount.value === total.value)

const toggleSelect = (id: string) => {
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
  const ids = [...selectedIds.value]
  if (ids.length === 0) return
  emit("purgeMany", ids)
  selectedIds.value = new Set()
}

const purgeAll = () => {
  if (total.value === 0) return
  emit("purgeAll")
  selectedIds.value = new Set()
}
</script>

<template>
  <TodoList :total="total" empty-text="보관된 항목이 없습니다.">
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
