import { computed, ref, watch } from "vue"
import type { Todo, AddTodoPayload } from "@/types/todo"
import { toDateKey } from "@/utils/dateKey"

// ===== Persistence (localStorage) =====
const STORAGE_KEY = "vue-todo:v1"
const FALLBACK_TODOS: Todo[] = []

type StoredTodo = Omit<Todo, "dateKey"> & Partial<Pick<Todo, "dateKey">>

// type guard: localStorage 데이터가 Todo 형태인지 구조 검증
const isTodo = (v: unknown): v is StoredTodo => {
  if (typeof v !== "object" || v === null) return false

  const t = v as Record<string, unknown>
  return (
    typeof t.id === "string" &&
    typeof t.title === "string" &&
    typeof t.done === "boolean" &&
    typeof t.createdAt === "number" &&
    typeof t.updatedAt === "number" &&
    (t.deletedAt === null || typeof t.deletedAt === "number")
  )
}

const loadTodos = (): Todo[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return FALLBACK_TODOS

    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return FALLBACK_TODOS

    const filtered = parsed.filter(isTodo)

    const patched: Todo[] = filtered.map((t) => ({
      ...t,
      dateKey:
        typeof t.dateKey === "string" && t.dateKey.trim()
          ? t.dateKey
          : toDateKey(new Date(t.createdAt)),
    }))

    return patched.length ? patched : FALLBACK_TODOS
  } catch (e) {
    console.warn("[todo] failed to load from localStorage:", e)
    return FALLBACK_TODOS
  }
}

const saveTodos = (next: Todo[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch (e) {
    console.warn("[todo] failed to save to localStorage:", e)
  }
}

// ===== shared state =====
const todos = ref<Todo[]>(loadTodos())

// todos 변경 시 자동 저장
watch(todos, (next) => saveTodos(next), { deep: true, flush: "post" })

// ===== Utils =====
const nextId = () => {
  const c = globalThis.crypto
  return c?.randomUUID ? c.randomUUID() : `id-${Date.now()}-${Math.random().toString(16).slice(2)}`
}
const now = () => Date.now()

// ===== Composable =====
// Todo 상태와 로직을 제공하는 전역 composable
export const useTodos = () => {
  // Home에 표시되는 Todo
  const aliveTodos = computed(() =>
    todos.value
      .filter((t) => t.deletedAt === null)
      .slice()
      .sort((a, b) => {
        if (a.dateKey !== b.dateKey) return a.dateKey < b.dateKey ? 1 : -1
        return b.createdAt - a.createdAt
      }),
  )

  // History에 표시되는 Todo
  const trashedTodos = computed(() => todos.value.filter((t) => t.deletedAt !== null))

  // Home 상단 요약용 완료 개수
  const doneCount = computed(() => aliveTodos.value.filter((t) => t.done).length)

  // Todo 추가
  const addTodo = (payload: AddTodoPayload) => {
    const trimmed = payload.title.trim()
    if (!trimmed) return

    const ts = now()
    const newTodo: Todo = {
      id: nextId(),
      title: trimmed,
      done: false,
      createdAt: ts,
      updatedAt: ts,
      deletedAt: null,
      dateKey: payload.dateKey,
    }
    todos.value = [newTodo, ...todos.value]
  }

  // 완료 / 미완료 토글
  const toggleTodo = (id: Todo["id"]) => {
    const ts = now()
    todos.value = todos.value.map((t) => (t.id === id ? { ...t, done: !t.done, updatedAt: ts } : t))
  }

  // 수정 (Home에서 사용)
  const editTodo = (payload: { id: Todo["id"]; title: string }) => {
    const trimmed = payload.title.trim()
    if (!trimmed) return

    const ts = now()
    todos.value = todos.value.map((t) =>
      t.id === payload.id ? { ...t, title: trimmed, updatedAt: ts } : t,
    )
  }

  // Home → History (보관)
  const archiveTodo = (id: Todo["id"]) => {
    const ts = now()
    todos.value = todos.value.map((t) => (t.id === id ? { ...t, deletedAt: ts, updatedAt: ts } : t))
  }

  // History → Home (보관 해제)
  const restoreTodo = (id: Todo["id"]) => {
    const ts = now()
    todos.value = todos.value.map((t) =>
      t.id === id ? { ...t, deletedAt: null, updatedAt: ts } : t,
    )
  }

  // History에서 완전 삭제
  const purgeTodo = (id: Todo["id"]) => {
    todos.value = todos.value.filter((t) => t.id !== id)
  }

  return {
    // raw state
    todos,

    // derived state (화면용)
    aliveTodos,
    trashedTodos,
    doneCount,

    // actions
    addTodo,
    toggleTodo,
    editTodo,
    archiveTodo, // Home → History
    restoreTodo, // History → Home
    purgeTodo, // History → 완전 삭제
  }
}
