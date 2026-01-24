<script setup lang="ts">
import { RouterLink, type RouteLocationRaw } from "vue-router"
import Container from "@/components/common/Container.vue"
import { ROUTES } from "@/router/paths"

type NavItem = {
  to: RouteLocationRaw
  label: string
  exactActive?: boolean
}

const baseLinkClass = "text-neutral-300 hover:text-neutral-100"
const activeLinkClass = "text-neutral-100 font-bold"

const navItems: NavItem[] = [
  { to: ROUTES.HOME, label: "Home", exactActive: true },
  { to: ROUTES.HISTORY, label: "History" },
]
</script>

<template>
  <header class="h-14 border-b border-neutral-800">
    <Container class="flex h-full items-center justify-between">
      <div class="text-sm font-semibold">ts-vue-todo</div>

      <nav class="flex items-center gap-4 text-sm">
        <RouterLink
          v-for="item in navItems"
          :key="String(item.to)"
          :to="item.to"
          :class="baseLinkClass"
          :active-class="activeLinkClass"
          :exact-active-class="item.exactActive ? activeLinkClass : undefined"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
    </Container>
  </header>
</template>
