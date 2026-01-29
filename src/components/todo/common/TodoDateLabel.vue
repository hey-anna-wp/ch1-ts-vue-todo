<script setup lang="ts">
defineProps<{
  dateKey: string
}>()
</script>

<template>
  <span class="text-xs text-neutral-500">
    {{ dateKey }}
  </span>
</template>
