<template>
  <div class="flex min-h-screen bg-[var(--lv-bg-app)] text-[var(--lv-text-primary)]">
    <!-- Sidebar -->

    <side-bar />

    <!-- Main content -->
    <main class="flex-1 p-6">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import SideBar from './SideBar.vue';

</script>
