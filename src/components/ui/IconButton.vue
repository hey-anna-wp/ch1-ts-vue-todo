<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    ariaLabel: string
    variant?: "ghost" | "danger" | "archive" | "restore"
    size?: "sm" | "md"
    disabled?: boolean
    title?: string
    type?: "button" | "submit"
  }>(),
  {
    variant: "ghost",
    size: "md",
    disabled: false,
    type: "button",
  },
)

// NOTE: 초기에는 danger만 hover 스타일을 분리했으나,
// 현재는 variant별 확장을 고려해 variantClassMap 사용
const variantClassMap = {
  ghost: "text-neutral-500 hover:text-neutral-200 hover:bg-neutral-800/40",
  archive: "text-neutral-500 hover:text-amber-300 hover:bg-neutral-800/40",
  restore: "text-neutral-500 hover:text-emerald-300 hover:bg-neutral-800/40",
  danger: "text-neutral-500 hover:text-red-300 hover:bg-neutral-800/40",
}

const base = "inline-flex items-center justify-center rounded-md transition "
const sizeClass = props.size === "sm" ? "h-8 w-8" : "h-9 w-9"
// const variantClass =
//   props.variant === "danger"
//     ? "text-neutral-500 hover:text-red-300 hover:bg-neutral-800/40"
//     : "text-neutral-500 hover:text-neutral-200 hover:bg-neutral-800/40"
const variantClass = variantClassMap[props.variant]
const disabledClass = props.disabled ? "opacity-50 pointer-events-none" : ""
</script>

<template>
  <button
    :type="props.type"
    :title="props.title ?? props.ariaLabel"
    :aria-label="props.ariaLabel"
    :disabled="props.disabled"
    :class="[base, sizeClass, variantClass, disabledClass]"
  >
    <slot />
  </button>
</template>
