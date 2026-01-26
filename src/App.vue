<script setup lang="ts">
import BaseLayout from "./layouts/BaseLayout.vue"
import { Toaster } from "vue-sonner"
import { toasterOptions } from "@/styles/toaster"
import ConfirmModal from "./components/common/ConfirmModal.vue"
</script>

<template>
  <BaseLayout>
    <RouterView />
  </BaseLayout>
  <Toaster position="bottom-right" close-button :toastOptions="toasterOptions" />
  <ConfirmModal />
</template>
