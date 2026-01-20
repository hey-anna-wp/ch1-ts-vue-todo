import type { Todo } from "@/types/todo"

export const seedTodos: Todo[] = [
  {
    id: "seed-1",
    title: "샘플 Todo",
    done: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    deletedAt: null,
  },
]
