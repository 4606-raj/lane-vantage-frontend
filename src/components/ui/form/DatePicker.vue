<template>
  <div class="flex flex-col gap-1 w-full my-6">

    <!-- Label -->
    <label
      v-if="label"
      class="text-sm font-medium text-[var(--lv-text-secondary)]"
    >
      {{ label }}
    </label>

    <!-- Datepicker -->
    <VueDatePicker
        v-model="internalValue"
        v-bind="attrs"
        :placeholder="placeholder"
        :auto-apply="true"
        :enable-time-picker="false"
        teleport="body"
        class="lv-datepicker"
    />

    <!-- Error -->
    <p v-if="error" class="text-sm text-red-500">
      {{ error }}
    </p>

  </div>
</template>

<script setup lang="ts">
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { computed, useAttrs } from 'vue'

const attrs = useAttrs()

const props = defineProps<{
  modelValue?: Date | null
  label?: string
  placeholder?: string
  error?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Date | null): void
}>()

const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val ?? null)
})
</script>

<style>
.lv-datepicker {
  --dp-background-color: var(--lv-input-bg);
  --dp-border-color: var(--lv-input-border);
  --dp-border-radius: 0.75rem;
}

.lv-datepicker .dp__input {
  min-height: 48px;
  border-radius: 0.75rem;
  border: 1px solid var(--lv-input-border);
  background: var(--lv-input-bg);
}

.lv-datepicker .dp__input:focus {
  box-shadow: 0 0 0 2px var(--lv-focus-ring);
}
</style>