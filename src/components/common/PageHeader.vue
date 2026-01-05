<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <header class="my-12 flex items-end justify-between">
    <div class="space-y-2">
      <h1 class="text-3xl font-semibold tracking-tight text-neutral-50">
        {{ title }}
      </h1>
      <p v-if="subtitle" class="text-sm text-neutral-400">
        {{ subtitle }}
      </p>
    </div>
    <div class="shrink-0">
      <slot name="right" />
    </div>
  </header>
</template>
