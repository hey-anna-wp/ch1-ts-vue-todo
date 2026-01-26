<script setup lang="ts">
const props = defineProps<{ done: boolean }>()
</script>

<template>
  <span
    class="mr-2 shrink-0 rounded-full px-2 py-1 text-xs"
    :class="props.done ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-500/15 text-amber-300'"
  >
    {{ props.done ? "완료" : "진행중" }}
  </span>
</template>
