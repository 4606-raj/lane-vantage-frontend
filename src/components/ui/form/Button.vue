<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <button
    :disabled="loading || disabled"
    class="font-bold py-2 px-4 rounded inline-flex items-center gap-2 transition"
    :class="loading || disabled
      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
      : 'bg-gray-300 hover:bg-gray-400 text-gray-800'"
    @click="handleClick"
  >
    <!-- Loader -->
    <svg
      v-if="loading"
      class="animate-spin h-4 w-4"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
        fill="none"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>

    <slot />
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  onClick: () => Promise<void> | void
  disabled?: boolean
}>()

const loading = ref(false)

const handleClick = async () => {
  if (loading.value || props.disabled) return

  try {
    loading.value = true
    await props.onClick()
  } finally {
    loading.value = false
  }
}
</script>
