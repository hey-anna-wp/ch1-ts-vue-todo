<script setup lang="ts">
import type { Todo } from "@/types/todo"
import TodoItemLayout from "@/components/todo/common/TodoItemLayout.vue"
import TodoStatusBadge from "@/components/todo/common/TodoStatusBadge.vue"
import IconButton from "@/components/ui/IconButton.vue"
import ArchiveIcon from "@/assets/icons/archive.svg"
import EditIcon from "@/assets/icons/edit.svg"
import { nextTick, ref, watch } from "vue"
import { MSG } from "@/constants/messages"

const props = defineProps<{ todo: Todo }>()

const emit = defineEmits<{
  (e: "toggle-done", id: Todo["id"]): void
  (e: "archive", id: Todo["id"]): void
  (e: "edit", payload: { id: Todo["id"]; title: string }): void
}>()

const onToggle = () => emit("toggle-done", props.todo.id)

// --- inline edit state ---
const isEditing = ref(false)
const editTitle = ref(props.todo.title)
const inputRef = ref<HTMLInputElement | null>(null)
const isSubmitting = ref(false)

watch(
  () => props.todo.title,
  (v) => {
    if (!isEditing.value) editTitle.value = v
  },
)

const startEdit = async () => {
  isEditing.value = true
  editTitle.value = props.todo.title
  await nextTick()
  inputRef.value?.focus()
  inputRef.value?.select()
}

const cancelEdit = () => {
  isEditing.value = false
  editTitle.value = props.todo.title
}

const submitEdit = () => {
  if (isSubmitting.value) return
  isSubmitting.value = true

  const trimmed = editTitle.value.trim()
  if (!trimmed) {
    cancelEdit()
    isSubmitting.value = false
    return
  }

  if (trimmed === props.todo.title) {
    isEditing.value = false
    isSubmitting.value = false
    return
  }

  emit("edit", { id: props.todo.id, title: trimmed })
  isEditing.value = false
  isSubmitting.value = false
}

const onEditKeydown = (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    e.preventDefault()
    submitEdit()
  } else if (e.key === "Escape") {
    e.preventDefault()
    cancelEdit()
  }
}
</script>

<template>
  <TodoItemLayout :rightGap="false">
    <template #left>
      <button
        type="button"
        class="inline-flex h-5 w-5 items-center justify-center rounded border focus:ring-2 focus:ring-emerald-500/40 focus:outline-none"
        :class="props.todo.done ? 'border-emerald-500 bg-emerald-500/20' : 'border-neutral-700'"
        role="checkbox"
        :aria-checked="props.todo.done"
        :aria-label="MSG.aria.toggleDone(props.todo.title)"
        @click="onToggle"
        @keydown.enter.prevent="onToggle"
        @keydown.space.prevent="onToggle"
      >
        <span v-if="props.todo.done" class="text-xs text-emerald-400">✓</span>
      </button>
      <!-- title / edit input -->
      <div class="min-w-0 flex-1">
        <input
          v-if="isEditing"
          ref="inputRef"
          v-model="editTitle"
          type="text"
          class="h-9 w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 text-sm text-neutral-100 placeholder:text-neutral-500 focus:ring-2 focus:ring-sky-500/30 focus:outline-none"
          @keydown="onEditKeydown"
          @blur="submitEdit"
        />
        <span
          v-else
          class="block truncate text-sm"
          :class="
            props.todo.done
              ? 'cursor-default text-neutral-400 line-through'
              : 'cursor-pointer text-neutral-100 hover:text-sky-300 hover:underline'
          "
          @dblclick="!props.todo.done && startEdit()"
        >
          {{ props.todo.title }}
        </span>
      </div>
    </template>

    <template #right>
      <TodoStatusBadge :done="props.todo.done" />

      <IconButton
        ariaLabel="수정"
        title="수정"
        variant="edit"
        :disabled="props.todo.done"
        @click="startEdit"
      >
        <EditIcon class="h-5 w-5" />
      </IconButton>

      <IconButton
        ariaLabel="보관"
        title="보관"
        @click="emit('archive', props.todo.id)"
        variant="archive"
      >
        <ArchiveIcon />
      </IconButton>
    </template>
  </TodoItemLayout>
</template>
