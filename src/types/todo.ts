export interface Todo {
  id: string
  title: string
  done: boolean
  createdAt: number
  updatedAt: number
  deletedAt: number | null
  dateKey: string
}

export type AddTodoPayload = {
  title: string
  dateKey: string
}

export type EditTodoPayload = {
  id: Todo["id"]
  title: string
  dateKey: string
}

export type SortOrder = "asc" | "desc"
