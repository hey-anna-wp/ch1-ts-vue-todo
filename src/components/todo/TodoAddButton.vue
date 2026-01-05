<script setup lang="ts">
const emit = defineEmits<{ (e: "toggle"): void }>()
</script>

<template>
  <button
    @click="emit('toggle')"
    class="flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 py-2 text-sm text-neutral-200 hover:bg-neutral-800"
  >
    "+ 할 일 추가"
  </button>
</template>
