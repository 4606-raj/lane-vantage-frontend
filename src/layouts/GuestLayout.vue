<template>
  <div class="flex min-h-screen items-center justify-center bg-[var(--lv-bg-app)]">
    <div class="w-full max-w-md rounded-xl border border-[var(--lv-border)] bg-[var(--lv-bg-surface)] p-6 text-[var(--lv-text-primary)] shadow-[var(--lv-shadow-sm)]">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
// no logic here on purpose
</script>
