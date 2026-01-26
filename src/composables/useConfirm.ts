import { computed, ref } from "vue"
import { MSG } from "@/constants/messages"

type ConfirmPayload = {
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  destructive?: boolean
}

const open = ref(false)

const payload = ref<ConfirmPayload>({
  title: "",
  description: "",
  confirmText: MSG.action.confirm,
  cancelText: MSG.action.cancel,
  destructive: false,
})

let resolver: ((value: boolean) => void) | null = null

const confirm = (next: ConfirmPayload) => {
  // 이미 대기 중인 confirm이 있으면 취소(false)로 정리해서 dangling Promise를 방지
  if (resolver) {
    resolver(false)
    resolver = null
  }
  payload.value = {
    title: next.title,
    description: next.description ?? "",
    confirmText: next.confirmText ?? MSG.action.confirm,
    cancelText: next.cancelText ?? MSG.action.cancel,
    destructive: next.destructive ?? false,
  }

  open.value = true

  return new Promise<boolean>((resolve) => {
    resolver = resolve
  })
}

const resolveAndClose = (value: boolean) => {
  open.value = false
  resolver?.(value)
  resolver = null
}

const onConfirm = () => resolveAndClose(true)
const onCancel = () => resolveAndClose(false)

export function useConfirm() {
  const destructiveConfirm = (p: Pick<ConfirmPayload, "title" | "description" | "confirmText">) =>
    confirm({
      title: p.title,
      description: p.description ?? MSG.common.irreversible,
      confirmText: p.confirmText ?? MSG.action.delete,
      cancelText: MSG.action.cancel,
      destructive: true,
    })

  return {
    open: computed(() => open.value),
    payload: computed(() => payload.value),
    confirm,
    destructiveConfirm,
    onConfirm,
    onCancel,
  }
}
