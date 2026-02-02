<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue"
import DatePickerInput from "@/components/ui/DatePickerInput.vue"

const props = withDefaults(
  defineProps<{
    initialTitle: string
    initialDateKey: string
    disabled?: boolean
    min?: string
    max?: string
    ariaLabelTitle?: string
    ariaLabelDate?: string
    /** 스타일 확장 */
    wrapperClass?: string
    titleInputClass?: string
    dateWrapperClass?: string
    dateInputClass?: string
    /** 마운트 시 제목 인풋에 포커스 */
    autoFocus?: boolean
  }>(),
  {
    disabled: false,
    ariaLabelTitle: "할 일 제목 수정",
    ariaLabelDate: "할 일 날짜 수정",
    wrapperClass: "",
    titleInputClass: "",
    dateWrapperClass: "",
    dateInputClass: "",
    autoFocus: true,
  },
)

const emit = defineEmits<{
  (e: "submit", payload: { title: string; dateKey: string }): void
  (e: "cancel"): void
}>()

const titleRef = ref<HTMLInputElement | null>(null)
const title = ref(props.initialTitle)
const dateKey = ref(props.initialDateKey)

const focusTitle = async () => {
  await nextTick()
  titleRef.value?.focus()
  titleRef.value?.select()
}

onMounted(() => props.autoFocus && !props.disabled && focusTitle())

const cancel = () => emit("cancel")

const submit = () => {
  if (props.disabled) return

  const trimmed = title.value.trim()
  if (!trimmed) return emit("cancel")

  if (trimmed === props.initialTitle && dateKey.value === props.initialDateKey)
    return emit("cancel")

  emit("submit", { title: trimmed, dateKey: dateKey.value })
}

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    e.preventDefault()
    submit()
  } else if (e.key === "Escape") {
    e.preventDefault()
    cancel()
  }
}

defineExpose({ submit, cancel })
</script>

<template>
  <div class="flex min-w-0 flex-1 items-center gap-2" :class="wrapperClass">
    <!-- Date -->
    <div class="shrink-0" :class="dateWrapperClass">
      <DatePickerInput
        v-model="dateKey"
        size="sm"
        :default-today="false"
        :disabled="disabled"
        :min="min"
        :max="max"
        :aria-label="ariaLabelDate"
        :show-icon="true"
        wrapper-class="w-[150px]"
        :input-class="['h-9 focus:ring-sky-500/30', dateInputClass].join(' ')"
        @keydown="onKeydown"
      />
    </div>
    <!-- Title -->
    <div class="min-w-0 flex-1">
      <input
        ref="titleRef"
        v-model="title"
        type="text"
        :disabled="disabled"
        :aria-label="ariaLabelTitle"
        class="h-9 w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 text-sm text-neutral-100 placeholder:text-neutral-500 focus:ring-2 focus:ring-sky-500/30 focus:outline-none disabled:opacity-60"
        :class="titleInputClass"
        @keydown="onKeydown"
      />
    </div>
  </div>
</template>
