<script setup lang="ts">
import { computed, ref } from "vue"
import { todos as seedTodos } from "@/data/todos"
import TodoList from "@/components/todo/TodoList.vue"
import PageHeader from "@/components/common/PageHeader.vue"
import TodoAddForm from "@/components/todo/TodoAddForm.vue"
import TodoAddButton from "@/components/todo/TodoAddButton.vue"
import type { Todo } from "@/types/todo"

const todos = ref<Todo[]>(seedTodos)
const doneCount = computed(() => todos.value.filter((t) => t.done).length)

const isFormOpen = ref(false)
const setFormOpen = (v: boolean) => (isFormOpen.value = v)

// id 생성 (데모용)
const nextId = () => crypto.randomUUID()

const addTodo = (title: string) => {
  const trimmed = title.trim()
  if (!trimmed) return

  const newTodo: Todo = {
    id: nextId(),
    title: trimmed,
    done: false,
  }

  todos.value = [newTodo, ...todos.value]
  setFormOpen(false)
}

const toggleTodo = (id: Todo["id"]) => {
  todos.value = todos.value.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
}

const removeTodo = (id: Todo["id"]) => {
  todos.value = todos.value.filter((t) => t.id !== id)
}
</script>

<template>
  <div class="w-full space-y-6">
    <PageHeader title="ts-vue-todo-ch1" subtitle="Vue 3 + TS Todo" />
    <TodoAddButton v-if="!isFormOpen" @toggle="setFormOpen(true)" />
    <div v-else>
      <TodoAddForm @cancel="setFormOpen(false)" @submit="addTodo" />
    </div>
    <TodoList
      :todos="todos"
      :done-count="doneCount"
      :total="todos.length"
      @remove="removeTodo"
      @toggle="toggleTodo"
    />
  </div>
</template>
