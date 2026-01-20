<script setup lang="ts">
import { computed, ref, watch } from "vue"
import { seedTodos } from "@/data/todos"
import TodoList from "@/components/todo/TodoList.vue"
import PageHeader from "@/components/common/PageHeader.vue"
import TodoAddForm from "@/components/todo/TodoAddForm.vue"
import TodoAddButton from "@/components/todo/TodoAddButton.vue"
import type { Todo } from "@/types/todo"

const STORAGE_KEY = "vue-todo:v1"
const isTodo = (v: any): v is Todo =>
  v &&
  typeof v.id === "string" &&
  typeof v.title === "string" &&
  typeof v.done === "boolean" &&
  typeof v.createdAt === "number" &&
  typeof v.updatedAt === "number" &&
  (v.deletedAt === null || typeof v.deletedAt === "number")
const loadTodos = (): Todo[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return seedTodos // 배포용이면 []로 바꿔도 됨
    const parsed = JSON.parse(raw)

    if (!Array.isArray(parsed)) return seedTodos
    const filtered = parsed.filter(isTodo)
    return filtered.length ? filtered : seedTodos
  } catch (e) {
    console.warn("[todo] failed to load from localStorage:", e)
    return seedTodos
  }
}
const saveTodos = (next: Todo[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch (e) {
    console.warn("[todo] failed to save to localStorage:", e)
  }
}

// state
const todos = ref<Todo[]>(loadTodos())
watch(todos, (next) => saveTodos(next), { deep: true, flush: "post" })

// derived state
const doneCount = computed(() => todos.value.filter((t) => t.deletedAt === null && t.done).length)

// ui state
const isFormOpen = ref(false)
const setFormOpen = (v: boolean) => (isFormOpen.value = v)

// utils
const nextId = () => (crypto.randomUUID ? crypto.randomUUID() : `id-${Date.now()}-${Math.random()}`)
const now = () => Date.now()

// actions
const addTodo = (title: string) => {
  const trimmed = title.trim()
  if (!trimmed) return

  const ts = now()

  const newTodo: Todo = {
    id: nextId(),
    title: trimmed,
    done: false,
    createdAt: ts,
    updatedAt: ts,
    deletedAt: null,
  }

  todos.value = [newTodo, ...todos.value]
  setFormOpen(false)
}

const toggleTodo = (id: Todo["id"]) => {
  const ts = now() // time stamp
  todos.value = todos.value.map((t) => (t.id === id ? { ...t, done: !t.done, updatedAt: ts } : t))
}

// Day1에서는 완전삭제 유지 (Day3부터 deletedAt으로 "휴지통" 처리로 변경)
const removeTodo = (id: Todo["id"]) => (todos.value = todos.value.filter((t) => t.id !== id))
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
