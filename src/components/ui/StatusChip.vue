<script setup lang="ts">
import { projectStatuses } from '@/utils/constants';

defineProps<{
  status: keyof typeof projectStatuses
}>()

const badges = {
  cancelled: "bg-gray-100 text-gray-800",
  completed: "bg-green-100 text-green-800",
  in_progress: "bg-orange-100 text-orange-800",
  not_started: "bg-yellow-100 text-yellow-800",
  on_hold: "bg-red-100 text-red-800",
}
</script>

<template>
  <div class="flex gap-2">
    <div class="rounded-md flex items-center py-0.5 px-2.5 border border-transparent text-sm transition-all shadow-sm":class="badges[status]">
      {{ projectStatuses[status] }}
    </div>
  </div>
</template>