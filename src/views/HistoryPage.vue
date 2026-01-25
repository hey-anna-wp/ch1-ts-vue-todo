<script setup lang="ts">
import PageHeader from "@/components/common/PageHeader.vue"
import TodoListHistory from "@/components/todo/TodoListHistory.vue"
import { useTodos } from "@/composables/useTodos"
import { toast } from "vue-sonner"

const { trashedTodos, restoreTodo, purgeTodo } = useTodos()

const purgeOne = (id: string) => {
  const ok = window.confirm("영구 삭제할까요? 복구할 수 없습니다.")
  if (!ok) return
  purgeTodo(id)
  toast("할 일이 영구 삭제되었습니다")
}

const purgeMany = (ids: string[]) => {
  const ok = window.confirm(`선택 ${ids.length}개를 영구 삭제할까요? 복구할 수 없습니다.`)
  if (!ok) return
  ids.forEach((id) => purgeTodo(id))
  toast(`${ids.length}개의 할 일이 삭제되었습니다`)
}

const purgeAll = () => {
  if (trashedTodos.value.length === 0) return
  const ok = window.confirm(`보관된 항목 ${trashedTodos.value.length}개를 전부 영구 삭제할까요?`)
  if (!ok) return

  trashedTodos.value.forEach((t) => purgeTodo(t.id))
  toast("모든 보관 항목이 삭제되었습니다")
}
</script>

<template>
  <div class="w-full space-y-6">
    <PageHeader
      title="지나간 할 일"
      subtitle="보관했던 할 일을 다시 꺼내거나 완전히 삭제할 수 있어요"
    />

    <TodoListHistory
      :todos="trashedTodos"
      @restore="restoreTodo"
      @purge="purgeOne"
      @purge-many="purgeMany"
      @purge-all="purgeAll"
    />
  </div>
</template>
