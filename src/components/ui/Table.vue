<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
defineProps<{
  headers: { label: string; key: string }[]
  items: any[]
}>()
</script>

<template>
    <table class="min-w-full text-sm">
        <thead class="bg-[var(--lv-bg-surface-soft)] text-[var(--lv-text-muted)]">
            <tr>
                <th
                    v-for="h in headers"
                    :key="h.key"
                    class="px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em]"
                    :class="{ 'text-right': h.label === 'Actions', 'text-left': h.label !== 'Actions' }"
                >
                    {{ h.label }}
                </th>
            </tr>
        </thead>

        <tbody>
            <tr
                v-for="item in items"
                :key="item.id"
                class="border-t border-[var(--lv-border-soft)] transition hover:bg-[var(--lv-bg-surface-soft)]"
            >
                <template v-for="h in headers" :key="h.key">
                    
                    <!-- If slot exists, use it -->
                    <td v-if="$slots[h.key]" class="px-6 py-4 font-medium text-[var(--lv-text-primary)]">
                        <slot :name="h.key" :item="item" />
                    </td>

                    <!-- Else default render -->
                    <td v-else class="px-6 py-4 font-medium text-[var(--lv-text-primary)]">
                        {{ item[h.key] }}
                    </td>

                </template>
            </tr>

            <tr v-if="!items.length">
                <td :colspan="headers.length" class="px-6 py-14 text-center text-sm text-[var(--lv-text-muted)]">
                    No data found
                </td>
            </tr>
        </tbody>
    </table>
</template>