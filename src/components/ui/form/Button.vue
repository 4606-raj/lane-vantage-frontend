<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <button
    :disabled="loading || disabled"
    class="flex items-center gap-3 rounded-lg bg-gray-900 py-2 px-4 text-center align-middle text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
    :class="loading || disabled
      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
      : ''"
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
