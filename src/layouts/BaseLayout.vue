<template>
  <div class="flex min-h-screen flex-col">
    <header class="h-14 border-b border-neutral-800">
      <Container> Header </Container>
    </header>
    <main class="flex flex-1 justify-center bg-neutral-950/40 text-neutral-100">
      <Container>
        <slot />
      </Container>
    </main>
    <footer class="h-12 border-t border-neutral-800">
      <Container> Footer </Container>
    </footer>
  </div>
</template>

<script setup lang="ts">
import Container from "@/components/common/Container.vue"
</script>
