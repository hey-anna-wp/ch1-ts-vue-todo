import { computed, ref, unref, watch, type ComputedRef, type Ref } from "vue"

type UsePaginationOptions = {
  pageSize?: number
  resetPageOnItemsChange?: boolean
}

// Ref<T[]> 또는 ComputedRef<T[]> 둘 다 받기
type ListSource<T> = Ref<T[]> | ComputedRef<T[]>

export type UsePaginationReturn<T> = {
  // state
  pageSize: Ref<number>
  currentPage: Ref<number>
  totalPages: ComputedRef<number>
  total: ComputedRef<number>

  // derived
  pagedItems: ComputedRef<T[]>
  canPrev: ComputedRef<boolean>
  canNext: ComputedRef<boolean>
  rangeText: ComputedRef<string>

  // actions
  setPage: (page: number) => void
  prev: () => void
  next: () => void
}

export function usePagination<T>(
  items: ListSource<T>,
  options: UsePaginationOptions = {},
): UsePaginationReturn<T> {
  const pageSize = ref(options.pageSize ?? 10)
  const currentPage = ref(1)

  const total = computed(() => unref(items).length)
  const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize.value)))

  const startIndex = computed(() => (currentPage.value - 1) * pageSize.value)
  const endIndex = computed(() => startIndex.value + pageSize.value)

  const pagedItems = computed<T[]>(() => unref(items).slice(startIndex.value, endIndex.value))

  const canPrev = computed(() => currentPage.value > 1)
  const canNext = computed(() => currentPage.value < totalPages.value)

  const setPage = (page: number) => {
    const safe = Math.min(Math.max(1, page), totalPages.value)
    currentPage.value = safe
  }
  const prev = () => setPage(currentPage.value - 1)
  const next = () => setPage(currentPage.value + 1)

  // items 길이가 줄어서 currentPage가 유효 범위를 벗어나는 경우 보정
  watch([totalPages, pageSize], () => {
    if (currentPage.value > totalPages.value) currentPage.value = totalPages.value
  })

  // 아이템 변화 시 page=1 리셋 (정렬/필터 포함)
  if (options.resetPageOnItemsChange ?? true) {
    watch(
      () => unref(items),
      () => {
        currentPage.value = 1
      },
      { deep: false },
    )
  }

  const rangeText = computed(() => {
    if (total.value === 0) return "0"
    const from = startIndex.value + 1
    const to = Math.min(endIndex.value, total.value)
    return `${from}-${to} / ${total.value}`
  })

  return {
    // state
    pageSize,
    currentPage,
    totalPages,
    total,

    // derived
    pagedItems,
    canPrev,
    canNext,
    rangeText,

    // actions
    setPage,
    prev,
    next,
  }
}
