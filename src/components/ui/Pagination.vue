<script setup lang="ts">
import { computed } from "vue"

const props = withDefaults(
  defineProps<{
    currentPage: number
    totalPages: number
    canPrev: boolean
    canNext: boolean
    rangeText?: string
  }>(),
  { rangeText: "" },
)

const emit = defineEmits<{
  (e: "prev"): void
  (e: "next"): void
  (e: "set", page: number): void
}>()

// 기능 확장 시 축약(ellipsis)형 페이지네이션 수정 예정
// 현재 텍스트 버튼 형태 이전 다음, 아이콘 추가 예정

const pages = computed(() => Array.from({ length: props.totalPages }, (_, i) => i + 1))

const navBtnBase =
  "rounded-md border border-neutral-800 bg-neutral-900 px-2 py-1 transition hover:bg-neutral-800 disabled:cursor-default disabled:opacity-40"

const pageBtnBase =
  "min-w-8 rounded-md border px-2 py-1 transition disabled:cursor-default disabled:opacity-60"
const pageBtnActive = "border-neutral-600 bg-neutral-800 text-neutral-100"
const pageBtnIdle = "border-neutral-800 bg-neutral-900 text-neutral-300 hover:bg-neutral-800"
</script>

<template>
  <nav
    v-if="totalPages > 1"
    class="flex items-center justify-between gap-3 pt-2 text-sm text-neutral-300"
    aria-label="Pagination"
  >
    <!-- left -->
    <div class="flex items-center gap-2">
      <button
        type="button"
        :class="navBtnBase"
        aria-label="Previous page"
        :disabled="!canPrev"
        @click="emit('prev')"
      >
        Prev
      </button>

      <button
        type="button"
        :class="navBtnBase"
        aria-label="Next page"
        :disabled="!canNext"
        @click="emit('next')"
      >
        Next
      </button>
      <span v-if="rangeText" class="ml-2 text-neutral-400">{{ rangeText }}</span>
    </div>

    <!-- right -->
    <div class="flex flex-wrap items-center justify-end gap-1">
      <button
        v-for="p in pages"
        :key="p"
        type="button"
        :disabled="p === currentPage"
        :class="[pageBtnBase, p === currentPage ? pageBtnActive : pageBtnIdle]"
        :aria-current="p === currentPage ? 'page' : undefined"
        @click="emit('set', p)"
      >
        {{ p }}
      </button>
    </div>
  </nav>
</template>
