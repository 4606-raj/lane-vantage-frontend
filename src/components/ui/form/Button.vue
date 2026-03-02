<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <button
    :type="type"
    :disabled="uiStore.buttonLoading || disabled"
    class="flex items-center gap-3 rounded-lg bg-gray-900 py-2 px-4 text-center align-middle text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
    :class="uiStore.buttonLoading || disabled
      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
      : ''"
    @click="handleClick"
  >
    <!-- Loader -->
    <svg
      v-if="uiStore.buttonLoading"
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
import { useUIStore } from '@/stores/ui.store'

const props = withDefaults(defineProps<{
  onClick?: () => Promise<void> | void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}>(), {
  type: 'button',
})

const emit = defineEmits<{
  click: []
}>()

const uiStore = useUIStore()

const handleClick = async () => {
  if (props.disabled) return

  try {
    uiStore.setButtonLoader(true)
    if (props.onClick) {
      await props.onClick()
    } else {
      emit('click')
    }
  } finally {
    uiStore.setButtonLoader(false)
  }
}
</script>
