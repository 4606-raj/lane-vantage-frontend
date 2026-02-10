<template>
  <aside class="w-64 bg-white border-r">
    <div class="p-4 font-bold text-lg">
      Lane Vantage
    </div>

    <hr>

    <!-- list of sidebar menu here -->
     <ul class="space-y-6">
      <li
        v-for="section in sidebarMenu"
        :key="section.section"
      >
        <!-- Section title -->
        <p
          v-if="section.section"
          class="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider"
        >
          {{ section.section }}
        </p>

        <ul class="space-y-1">
          <li
            v-for="item in section.items"
            :key="item.route"
            @click="$router.push({ name: item.route })"
            class="group flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer
                  text-gray-700 hover:bg-gray-100 hover:text-gray-900
                  transition-colors"
            :class="{
              'bg-gray-100 text-gray-900 font-medium':
                $route.name === item.route
            }"
          >
            <!-- Icon -->
            <component
              :is="item.icon"
              class="w-5 h-5 text-gray-400 group-hover:text-gray-600"
              :class="{
                'text-gray-600': $route.name === item.route
              }"
            />

            <!-- Label -->
            <span class="text-sm">
              {{ item.label }}
            </span>
          </li>
        </ul>
      </li>
    </ul>

    <hr>

    <div class="p-4">

      <Button @click="logout" >
        <LogoutIcon />
        <span>Logout</span>
      </Button>

    </div>
  </aside>
</template>

<script setup lang="ts">
import router from '@/router';
import { useAuthStore } from '@/stores/auth.store';
import { toaster } from '@/utils/toast';
import Button from '@/components/ui/form/Button.vue'
import LogoutIcon from '@/components/icons/LogoutIcon.vue';

  const authStore = useAuthStore()

  const logout = async () => {
    try {
      const response = await authStore.logout()
      toaster.success(response)

      router.push({name: 'login'})
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(e: any) {
      toaster.error(e.message)
    }
  }

  const sidebarMenu = [
  {
    section: 'main',
    items: [
      { label: 'Dashboard', icon: 'DashboardIcon', route: 'dashboard' },
      { label: 'Boards', icon: 'BoardIcon', route: 'boards' },
      { label: 'Projects', icon: 'ProjectIcon', route: 'projects' },
      { label: 'Tasks', icon: 'TaskIcon', route: 'tasks' }
    ]
  },
  {
    section: 'work',
    items: [
      { label: 'My Tasks', icon: 'UserTaskIcon', route: 'my-tasks' },
      { label: 'Due Today', icon: 'CalendarIcon', route: 'tasks-today' },
      { label: 'Overdue', icon: 'WarningIcon', route: 'tasks-overdue' }
    ]
  },
  {
    section: 'settings',
    items: [
      { label: 'Profile', icon: 'ProfileIcon', route: 'profile' },
      { label: 'Settings', icon: 'SettingsIcon', route: 'settings' }
    ]
  }
]


</script>
