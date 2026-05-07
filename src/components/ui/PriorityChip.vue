<script setup lang="ts">
import { projectPriorities } from '@/utils/constants';

defineProps<{
  priority: keyof typeof projectPriorities
}>()

const badges = {
  low: "bg-green-100 text-green-800",
  medium: "bg-blue-100 text-blue-800",
  high: "bg-orange-100 text-orange-800",
}
</script>

<template>
  <div class="flex gap-2">
    <div class="rounded-md flex items-center py-0.5 px-2.5 border border-transparent text-sm transition-all shadow-sm":class="badges[priority]">
      {{ projectPriorities[priority] }}
    </div>
  </div>
</template>