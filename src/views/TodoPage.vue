<script setup lang="ts">
import { computed, ref } from "vue"
import { todos as seedTodos } from "@/data/todos"
import TodoList from "@/components/todo/TodoList.vue"
import PageHeader from "@/components/common/PageHeader.vue"
import TodoAddForm from "@/components/todo/TodoAddForm.vue"
import TodoAddButton from "@/components/todo/TodoAddButton.vue"

const todos = ref(seedTodos)
const doneCount = computed(() => todos.value.filter((t) => t.done).length)

const isFormOpen = ref(false)
const openForm = () => (isFormOpen.value = true)
const closeForm = () => (isFormOpen.value = false)
</script>

<template>
  <div class="w-full space-y-6">
    <PageHeader title="ts-vue-todo-ch1" subtitle="Vue 3 + TS Todo" />
    <TodoAddButton v-if="!isFormOpen" :open="isFormOpen" @toggle="openForm" />
    <div v-else class="animate-fade-in">
      <TodoAddForm @cancel="closeForm" />
    </div>
    <TodoList :todos="todos" :done-count="doneCount" :total="todos.length" />
  </div>
</template>
