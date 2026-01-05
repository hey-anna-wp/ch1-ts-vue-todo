<script setup lang="ts">
import { computed, ref } from "vue"
import { todos as seedTodos } from "@/data/todos"
import BaseLayout from "./layouts/BaseLayout.vue"

const todos = ref(seedTodos)

const doneCount = computed(() => todos.value.filter((t) => t.done).length)
</script>

<template>
  <BaseLayout>
    <RouterView />
  </BaseLayout>
</template>
