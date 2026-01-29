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
