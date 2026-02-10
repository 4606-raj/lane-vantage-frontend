<template>
  <div class="min-h-screen flex bg-gray-50">
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
