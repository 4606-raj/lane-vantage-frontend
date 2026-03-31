<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex flex-col gap-1 w-full my-6">
    
    <!-- Label -->
    <label
      v-if="label"
      class="text-sm font-medium text-[var(--lv-text-secondary)]"
    >
      {{ label }}
    </label>

    <!-- Multiselect -->
    <Multiselect
        v-model="internalValue"
        v-bind="attrs"
        :options="options"
        :mode="multiple ? 'tags' : 'single'"
        :placeholder="placeholder"
        :disabled="disabled"
        :searchable="true"
        :close-on-select="!multiple"
        class="lv-multiselect"
    />

    <!-- Error -->
    <p v-if="error" class="text-sm text-red-500">
      {{ error }}
    </p>

  </div>
</template>

<script setup lang="ts">
import Multiselect from '@vueform/multiselect'
import { computed, useAttrs } from 'vue'

const attrs = useAttrs()

const props = withDefaults(defineProps<{
  modelValue: (string | number)[] | string | number
  label?: string
  placeholder?: string
  options: { label: string; value: string | number }[]
  disabled?: boolean
  error?: string
  multiple?: boolean
}>(), {
  multiple: true
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: (string | number)[] | string | number): void
}>()

const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>

<style>
.lv-multiselect {
  --ms-bg: var(--lv-input-bg);
  --ms-border-color: var(--lv-input-border);
  --ms-radius: 0.75rem;
}

.lv-multiselect .multiselect {
  min-height: 48px;
  background: var(--lv-input-bg);
  border: 1px solid var(--lv-input-border);
  border-radius: 0.75rem;
}

.lv-multiselect .multiselect:focus-within {
  box-shadow: 0 0 0 2px var(--lv-focus-ring);
  border-color: var(--lv-input-border-focus);
}
</style>