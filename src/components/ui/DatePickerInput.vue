<script setup lang="ts">
import { computed, ref, onMounted } from "vue"
import { toDateKey } from "@/utils/dateKey"
import CalendarIcon from "@/assets/icons/calendar.svg"

/**
 * DatePickerInput
 * - native <input type="date"> 기반: 달력 UI(브라우저/OS)는 CSS로 커스텀 불가
 * - showPicker()는 일부 브라우저만 지원 → 지원 시 focus 없이 열고, 아니면 focus로 fallback
 */

type Size = "sm" | "md" | "lg"

const SIZE_CLASS: Record<Size, string> = {
  sm: "w-full sm:w-45", // 180px
  md: "w-full sm:w-52", // 208px
  lg: "w-full sm:w-60", // 240px
} as const

const props = withDefaults(
  defineProps<{
    modelValue?: string
    /* 값이 비어있을 때 오늘로 자동 세팅할지 */
    defaultToday?: boolean
    size?: Size
    inputClass?: string
    wrapperClass?: string
    disabled?: boolean
    /* min/max (YYYY-MM-DD) */
    min?: string
    max?: string
    ariaLabel?: string
    /* 아이콘 버튼 노출 */
    showIcon?: boolean
  }>(),
  {
    modelValue: "",
    defaultToday: true,
    size: "sm",
    inputClass: "",
    wrapperClass: "",
    disabled: false,
    ariaLabel: "날짜 선택",
    showIcon: true,
  },
)

const emit = defineEmits<{
  (e: "update:modelValue", v: string): void
}>()

onMounted(() => {
  const v = (props.modelValue || "").trim()
  if (!v && props.defaultToday) emit("update:modelValue", toDateKey())
})

const value = computed({
  get() {
    const v = (props.modelValue || "").trim()
    return v || (props.defaultToday ? toDateKey() : "")
  },
  set(v: string) {
    emit("update:modelValue", v)
  },
})

const inputRef = ref<HTMLInputElement | null>(null)

const openPicker = () => {
  const el = inputRef.value
  if (!el || props.disabled) return

  // 일부 브라우저에서 지원하는 showPicker()를 쓰기 위해
  // TS 타입에 없는 메서드를 optional로 캐스팅
  const anyEl = el as HTMLInputElement & { showPicker?: () => void }
  if (typeof anyEl.showPicker === "function") {
    anyEl.showPicker()
    return
  }

  el.focus()
}
</script>

<template>
  <div :class="[SIZE_CLASS[size], 'relative', wrapperClass]">
    <input
      ref="inputRef"
      v-model="value"
      type="date"
      :disabled="disabled"
      :min="min"
      :max="max"
      :aria-label="ariaLabel"
      class="h-10 w-full cursor-pointer rounded-md border border-neutral-800 bg-neutral-950 px-3 pr-10 text-sm text-neutral-100 placeholder:text-neutral-500 focus:ring-2 focus:ring-emerald-500/40 focus:outline-none disabled:opacity-60"
      :class="inputClass"
      @click="openPicker"
    />
    <button
      v-if="showIcon"
      type="button"
      :disabled="disabled"
      aria-label="날짜 선택 도구 열기"
      class="absolute top-1/2 right-2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center text-neutral-100/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 disabled:opacity-40"
      @click.stop="openPicker"
    >
      <CalendarIcon class="h-4 w-4" />
    </button>
  </div>
</template>
