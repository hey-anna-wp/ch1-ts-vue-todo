<script setup lang="ts">
import { ref, onMounted } from "vue"
import type { AddTodoPayload } from "@/types/todo"
import { toDateKey } from "@/utils/dateKey"
import DatePickerInput from "@/components/ui/DatePickerInput.vue"

const emit = defineEmits<{
  (e: "cancel"): void
  (e: "submit", payload: AddTodoPayload): void
}>()

const title = ref("")
const dateKey = ref<string>(toDateKey())
const inputRef = ref<HTMLInputElement | null>(null)

onMounted(() => {
  inputRef.value?.focus()
})

const onSubmit = () => {
  const trimmed = title.value.trim()
  if (!trimmed) return
  emit("submit", { title: trimmed, dateKey: dateKey.value })
  title.value = ""
}

const onCancel = () => {
  title.value = ""
  emit("cancel")
}
</script>

<template>
  <form
    class="flex w-full flex-col gap-2 rounded-lg border border-neutral-800 bg-neutral-900 p-2 sm:flex-row sm:items-center"
    @submit.prevent="onSubmit"
  >
    <DatePickerInput v-model="dateKey" size="sm" input-class="focus:ring-emerald-500/40" />
    <input
      ref="inputRef"
      v-model="title"
      type="text"
      placeholder="할 일을 입력하세요"
      class="h-10 w-full flex-1 rounded-md border border-neutral-800 bg-neutral-950 px-3 text-sm text-neutral-100 placeholder:text-neutral-500 focus:ring-2 focus:ring-emerald-500/40 focus:outline-none"
      @keydown.enter.prevent="onSubmit"
    />

    <button
      type="submit"
      class="h-10 shrink-0 rounded-md bg-emerald-600 px-4 text-sm font-medium text-neutral-900 hover:bg-emerald-500"
    >
      추가
    </button>

    <button
      type="button"
      @click="onCancel"
      class="h-10 shrink-0 rounded-md border border-neutral-800 bg-neutral-900 px-3 text-sm text-neutral-200 hover:bg-neutral-800"
    >
      취소
    </button>
  </form>
</template>
