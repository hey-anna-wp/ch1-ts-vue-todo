import type { Todo } from "@/types/todo"
import { toDateKey } from "@/utils/dateKey"
// 테스트용 seed 데이터
// UI 캡처/디자인 확인용으로 남겨둠 (실사용 로직에는 포함 안 됨)
export const seedTodos: Todo[] = [
  {
    id: "seed-1",
    title: "샘플 Todo",
    done: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    deletedAt: null,
    dateKey: toDateKey(),
  },
]
