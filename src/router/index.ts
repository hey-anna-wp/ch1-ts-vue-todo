import { createRouter, createWebHistory } from "vue-router"
import TodoPage from "@/views/TodoPage.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/", name: "todo", component: TodoPage }],
})

export default router
