<script setup lang="ts">
import Container from "@/components/common/Container.vue"
import AppHeader from "@/components/common/AppHeader.vue"
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />

    <main
      class="flex flex-1 justify-center overflow-y-auto bg-neutral-950/40 pb-16 text-neutral-100"
    >
      <Container>
        <slot />
      </Container>
    </main>

    <footer class="h-12 border-t border-neutral-800">
      <Container> Footer </Container>
    </footer>
  </div>
</template>
