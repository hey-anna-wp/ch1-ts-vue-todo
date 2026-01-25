<script setup lang="ts">
import BaseLayout from "./layouts/BaseLayout.vue"
import { Toaster } from "vue-sonner"
import { toasterOptions } from "@/styles/toaster"
</script>

<template>
  <BaseLayout>
    <RouterView />
  </BaseLayout>
  <Toaster position="bottom-right" close-button :toastOptions="toasterOptions" />
</template>
