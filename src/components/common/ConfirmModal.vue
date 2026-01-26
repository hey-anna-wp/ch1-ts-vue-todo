<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue"
import { useConfirm } from "@/composables/useConfirm"

const { open, payload, onConfirm, onCancel } = useConfirm()

const confirmBtnRef = ref<HTMLButtonElement | null>(null)

const onKeydown = (e: KeyboardEvent) => {
  if (!open.value) return
  if (e.key === "Escape") onCancel()
}

watch(
  () => open.value,
  (isOpen) => {
    if (isOpen) {
      // 모달이 렌더된 뒤 confirm 버튼에 focus를 주기 위함
      requestAnimationFrame(() => confirmBtnRef.value?.focus())
    }
  },
)

onMounted(() => window.addEventListener("keydown", onKeydown))
onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown))
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-[9999]">
      <!-- overlay -->
      <button
        type="button"
        aria-label="닫기"
        class="absolute inset-0 bg-black/50"
        @click="onCancel"
      />

      <!-- dialog -->
      <div class="relative flex h-full items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          class="w-full max-w-sm rounded-2xl border border-neutral-800/60 bg-neutral-900 p-5 shadow-2xl"
        >
          <h2 class="text-base font-semibold text-neutral-50">
            {{ payload.title }}
          </h2>

          <p v-if="payload.description" class="mt-2 text-sm leading-6 text-neutral-200">
            {{ payload.description }}
          </p>

          <div class="mt-5 flex items-center justify-end gap-2">
            <button
              type="button"
              class="rounded-lg border border-neutral-700/50 bg-neutral-900 px-3 py-2 text-sm text-neutral-200 hover:bg-neutral-800/40"
              @click="onCancel"
            >
              {{ payload.cancelText }}
            </button>

            <button
              ref="confirmBtnRef"
              type="button"
              class="rounded-lg px-3 py-2 text-sm font-medium"
              :class="
                payload.destructive
                  ? 'border border-neutral-800 bg-neutral-800 text-rose-300 hover:border-rose-400/10 hover:bg-rose-300/10'
                  : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'
              "
              @click="onConfirm"
            >
              {{ payload.confirmText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
