<script setup lang="ts">

defineProps<{
    subHeading?: string,
    mainHeading?: string,
    tagline?: string,
}>()

</script>

<template>
    <section class="rounded-2xl border border-[var(--lv-border)] bg-[var(--lv-bg-surface)] p-6 shadow-[var(--lv-shadow-sm)]">
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p class="text-[11px] font-semibold uppercase `tra`cking-[0.22em] text-[var(--lv-text-faint)]">
            {{ subHeading || 'sub heading' }}
          </p>
          <h1 class="mt-1 text-2xl font-semibold tracking-tight text-[var(--lv-text-primary)]">
            {{ mainHeading || 'Heading' }}
          </h1>
          <p class="mt-1 text-sm text-[var(--lv-text-muted)]">
            {{ tagline || 'tagline' }}
          </p>
        </div>

        <div class="flex items-center gap-2">
          <slot />
        </div>

      </div>
    </section>
</template>