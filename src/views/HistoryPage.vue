<script setup lang="ts">
import PageHeader from "@/components/common/PageHeader.vue"
import TodoListHistory from "@/components/todo/TodoListHistory.vue"
import { useTodos } from "@/composables/useTodos"
import { useConfirm } from "@/composables/useConfirm"
import { MSG } from "@/constants/messages"
import { toast } from "vue-sonner"

const { trashedTodos, restoreTodo, purgeTodo } = useTodos()
const { destructiveConfirm } = useConfirm()

const purgeOne = async (id: string) => {
  const ok = await destructiveConfirm({
    title: MSG.confirm.purgeOneTitle,
    // description: MSG.common.irreversible,
    confirmText: MSG.action.delete,
  })
  if (!ok) return

  purgeTodo(id)
  toast(MSG.toast.purgedOne)
}

const purgeMany = async (ids: string[]) => {
  const ok = await destructiveConfirm({
    title: MSG.confirm.purgeManyTitle(ids.length),
    // description: MSG.common.irreversible,
    confirmText: MSG.action.delete,
  })
  if (!ok) return

  ids.forEach(purgeTodo)
  toast(MSG.toast.purgedMany(ids.length))
}

const purgeAll = async () => {
  const n = trashedTodos.value.length
  if (n === 0) return

  const ok = await destructiveConfirm({
    title: MSG.confirm.purgeAllTitle(n),
    // description: MSG.common.irreversible,
    confirmText: MSG.action.deleteAll,
  })
  if (!ok) return

  trashedTodos.value.forEach((t) => purgeTodo(t.id))
  toast(MSG.toast.purgedAll(n), { id: `purge-all-${n}` })
}

const onRestore = (id: string) => {
  restoreTodo(id)
  toast(MSG.toast.restored)
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
      @restore="onRestore"
      @purge="purgeOne"
      @purge-many="purgeMany"
      @purge-all="purgeAll"
    />
  </div>
</template>
