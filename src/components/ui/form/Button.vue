<!-- eslint-disable vue/multi-word-component-names -->
<template>

    <button
      :type="type"
      :disabled="uiStore.buttonLoading || disabled"
      class="flex cursor-pointer items-center justify-center gap-3 mx-2 rounded-lg border border-[var(--lv-border)] px-4 py-2 text-center align-middle shadow-[var(--lv-shadow-sm)] transition-all hover:shadow-lg hover:shadow-[var(--lv-btn-hover-shadow)] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      :class="[
    variantClasses[variant],
    uiStore.buttonLoading || disabled
      ? 'cursor-not-allowed bg-[var(--lv-bg-surface-muted)] text-[var(--lv-text-faint)]'
      : ''
  ]"
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
  variant?: 'primary' | 'secondary' | 'success' | 'error'
}>(), {
  type: 'button',
  variant: 'primary',
})

const emit = defineEmits<{
  click: []
}>()

const variantClasses = {
  primary: 'bg-[var(--lv-btn-bg)] text-[var(--lv-text-secondary)] hover:bg-[var(--lv-btn-hover-bg)]',
  secondary: 'bg-[var(--lv-btn-secondary-bg)] text-[var(--lv-text-on-accent)] hover:bg-[var(--lv-btn-secondary-hover-bg)]',
  success: 'bg-[var(--lv-btn-success-bg)] text-[var(--lv-text-on-accent)] hover:bg-[var(--lv-btn-success-hover-bg)]',
  error: 'bg-[var(--lv-btn-danger-bg)] text-[var(--lv-text-on-accent)] hover:bg-[var(--lv-btn-danger-hover-bg)]',
}

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
