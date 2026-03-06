<!-- eslint-disable vue/multi-word-component-names -->
<template>

    <button
      :type="type"
      :disabled="uiStore.buttonLoading || disabled"
      class="flex cursor-pointer items-center justify-center gap-3 rounded-lg border border-[var(--lv-border)] bg-[var(--lv-btn-bg)] px-4 py-2 text-center align-middle text-[var(--lv-text-secondary)] shadow-[var(--lv-shadow-sm)] transition-all hover:bg-[var(--lv-btn-hover-bg)] hover:shadow-lg hover:shadow-[var(--lv-btn-hover-shadow)] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      :class="uiStore.buttonLoading || disabled
        ? 'cursor-not-allowed bg-[var(--lv-bg-surface-muted)] text-[var(--lv-text-faint)]'
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
