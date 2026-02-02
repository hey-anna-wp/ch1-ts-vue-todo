<script setup lang="ts">
import type { Todo, EditTodoPayload } from "@/types/todo"
import { ref } from "vue"
import { MSG } from "@/constants/messages"

import TodoItemLayout from "@/components/todo/common/TodoItemLayout.vue"
import TodoStatusBadge from "@/components/todo/common/TodoStatusBadge.vue"
import IconButton from "@/components/ui/IconButton.vue"
import TodoInlineEditor from "@/components/todo/home/TodoInlineEditor.vue"

import ArchiveIcon from "@/assets/icons/archive.svg"
import EditIcon from "@/assets/icons/edit.svg"

const props = defineProps<{ todo: Todo }>()

const emit = defineEmits<{
  (e: "toggle-done", id: Todo["id"]): void
  (e: "archive", id: Todo["id"]): void
  (e: "edit", payload: EditTodoPayload): void
}>()

type InlineEditorExposed = { submit: () => void; cancel: () => void }
type EditorSubmitPayload = Omit<EditTodoPayload, "id">

const isEditing = ref(false)
const editorRef = ref<InlineEditorExposed | null>(null)

const onToggle = () => emit("toggle-done", props.todo.id)

const startEdit = () => {
  if (props.todo.done) return
  isEditing.value = true
}

const cancelEdit = () => (isEditing.value = false)

const submitEdit = (payload: EditorSubmitPayload) => {
  emit("edit", { id: props.todo.id, ...payload })
  isEditing.value = false
}

// 편집 중일 때만 바깥 클릭 저장
const onOutsideSave = () => {
  if (isEditing.value) editorRef.value?.submit()
}
</script>

<template>
  <TodoItemLayout :rightGap="false">
    <template #marker>
      <TodoMarker :dateKey="props.todo.dateKey" />
    </template>
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

      <!-- 편집 모드일 때: overlay + editor -->
      <div v-if="isEditing" class="relative min-w-0 flex-1">
        <button
          type="button"
          class="fixed inset-0 z-9998 cursor-default"
          aria-label="편집 저장"
          @click="onOutsideSave"
        />
        <!-- editor 본체 (overlay 위) -->
        <div class="relative z-9999" @click.stop>
          <TodoInlineEditor
            ref="editorRef"
            :initialTitle="props.todo.title"
            :initialDateKey="props.todo.dateKey"
            @submit="submitEdit"
            @cancel="cancelEdit"
          />
        </div>
      </div>

      <!-- 보기 모드일 때: 기존 UI -->
      <template v-else>
        <TodoDateLabel :dateKey="props.todo.dateKey" />
        <div class="min-w-0 flex-1">
          <span
            class="block truncate text-sm"
            :class="
              props.todo.done
                ? 'cursor-default text-neutral-400 line-through'
                : 'cursor-pointer text-neutral-100 hover:text-sky-300 hover:underline'
            "
            @dblclick="startEdit"
          >
            {{ props.todo.title }}
          </span>
        </div>
      </template>
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
