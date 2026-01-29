<script setup lang="ts">
import { computed } from "vue"
import { colorIndexFromDateKey } from "@/utils/dateKey"
import { MARKER_24 } from "@/constants/colorMarkers"

const props = defineProps<{
  dateKey: string
  widthClass?: string // w-2 커스텀용
}>()

const markerColor = computed(() => {
  const key = props.dateKey
  if (!key) return "#404040"
  const idx = colorIndexFromDateKey(key, MARKER_24.length)
  return MARKER_24[idx] ?? "#404040"
})
</script>

<template>
  <!-- widthClass는 optional override -->
  <span
    class="todo-marker absolute top-0 left-0 z-10 h-full overflow-hidden"
    :class="props.widthClass ?? 'w-2'"
    :style="{ backgroundColor: markerColor }"
    aria-hidden="true"
  />
</template>

<style scoped>
/*
  TODO(marker highlight):
  현재 다크 UI에서 컬러 구분을 위해 마커에 하이라이트/쉐도우를 추가한 상태.
  향후 light mode 또는 테마 시스템 도입 시 제거하거나 톤 조정 예정.
*/
.todo-marker {
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.12),
    0 0 0 1px rgba(0, 0, 0, 0.35);
}
.todo-marker::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.15), rgba(0, 0, 0, 0.2));
  pointer-events: none;
}
</style>
