import { ref } from "vue"
import type { SortOrder } from "@/types/todo"

export const useSortOrder = (initial: SortOrder = "desc") => {
  const sortOrder = ref<SortOrder>(initial)
  const toggleSortOrder = () => {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc"
  }
  return { sortOrder, toggleSortOrder }
}
