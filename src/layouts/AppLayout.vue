<template>
  <div class="min-h-screen flex bg-gray-50">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r">
      <div class="p-4 font-bold text-lg">
        Lane Vantage
      </div>
    </aside>

    <!-- Main content -->
    <main class="flex-1 p-6">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
// later: inject user, logout, permissions, etc.
</script>
