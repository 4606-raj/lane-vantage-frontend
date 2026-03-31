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

    <!-- Select -->
    <select
      :value="modelValue"
      :disabled="disabled"
      :required="required"
      class="h-12 w-full rounded-xl border border-[var(--lv-input-border)] bg-[var(--lv-input-bg)] px-3 text-[var(--lv-text-secondary)] outline-none transition focus:border-[var(--lv-input-border-focus)] focus:bg-[var(--lv-input-bg-focus)] focus:ring-2 focus:ring-[var(--lv-focus-ring)] disabled:opacity-50 disabled:cursor-not-allowed"
      @input="updateValue"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>

    <!-- Error -->
    <p
      v-if="error"
      class="text-sm text-red-500"
    >
      {{ error }}
    </p>

  </div>
</template>

<script setup lang="ts">

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  modelValue: string | number | string[] | number[] | undefined
  label?: string
  placeholder?: string
  options: { label: string, value: string | number }[]
  disabled?: boolean
  required?: boolean
  error?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const updateValue = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

</script>
