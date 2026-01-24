import { createRouter, createWebHistory } from "vue-router"
import TodoPage from "@/views/TodoPage.vue"
import HistoryPage from "@/views/HistoryPage.vue"
import { ROUTES } from "./paths"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: ROUTES.HOME, name: "todo", component: TodoPage },
    { path: ROUTES.HISTORY, name: "history", component: HistoryPage },
  ],
})

export default router
