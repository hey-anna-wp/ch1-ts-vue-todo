<script setup lang="ts">
type ContainerSize = "sm" | "md" | "lg" | "xl"
const props = withDefaults(
  defineProps<{
    size?: ContainerSize
  }>(),
  {
    size: "lg",
  },
)

const maxWidthClass: Record<ContainerSize, string> = {
  sm: "max-w-md", //448
  md: "max-w-lg", //512
  lg: "max-w-5xl", // 1024px
  xl: "max-w-7xl", //1280
}

const computedMaxWidthClass = maxWidthClass[props.size]
</script>

<template>
  <div class="mx-auto w-full px-4" :class="computedMaxWidthClass">
    <slot />
  </div>
</template>
