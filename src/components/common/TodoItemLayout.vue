<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    rightGap?: boolean
  }>(),
  {
    rightGap: true,
  },
)
</script>

<template>
  <li
    class="flex items-center justify-between gap-3 rounded-lg border border-neutral-800 bg-neutral-900 px-4 pt-2 pb-1.5"
  >
    <!-- left 영역 -->
    <div class="flex min-w-0 items-center gap-3">
      <slot name="left" />
    </div>

    <!-- right 영역 -->
    <div class="flex shrink-0 items-center" :class="props.rightGap && 'gap-2'">
      <slot name="right" />
    </div>
  </li>
</template>
