<script setup lang="ts">
import { ref } from "vue"
import PageHeader from "@/components/common/PageHeader.vue"
import TodoAddForm from "@/components/todo/TodoAddForm.vue"
import TodoAddButton from "@/components/todo/TodoAddButton.vue"
import { useTodos } from "@/composables/useTodos"
import TodoListHome from "@/components/todo/TodoListHome.vue"

const { aliveTodos, doneCount, addTodo, toggleTodo, archiveTodo } = useTodos()

// ui state
const isFormOpen = ref(false)
const openForm = () => (isFormOpen.value = true)
const closeForm = () => (isFormOpen.value = false)

const handleSubmit = (title: string) => {
  addTodo(title)
  closeForm()
}
</script>

<template>
  <div class="w-full space-y-6">
    <PageHeader title="할 일" subtitle="할 일을 추가하고 완료해 보세요" />
    <TodoAddButton v-if="!isFormOpen" @open="openForm" />
    <TodoAddForm v-else @cancel="closeForm" @submit="handleSubmit" />

    <TodoListHome
      :todos="aliveTodos"
      :done-count="doneCount"
      :total="aliveTodos.length"
      @toggle-done="toggleTodo"
      @archive="archiveTodo"
    />
  </div>
</template>
