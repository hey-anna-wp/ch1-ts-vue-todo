import type { SortOrder, Todo } from "@/types/todo"

export const sortTodos = (todos: Todo[], order: SortOrder) => {
  const dir = order === "asc" ? 1 : -1
  return [...todos].sort((a, b) => {
    if (a.dateKey !== b.dateKey) return (a.dateKey > b.dateKey ? 1 : -1) * dir
    if (a.createdAt !== b.createdAt) return (a.createdAt - b.createdAt) * dir
    return a.id > b.id ? 1 : -1
  })
}
