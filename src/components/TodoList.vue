<script setup lang="ts">
import { todos } from '@/data/todos'
</script>

<template>
  <ul>
    <li v-for="todo in todos" :key="todo.id">{{ todo.title }}</li>
  </ul>
</template>
