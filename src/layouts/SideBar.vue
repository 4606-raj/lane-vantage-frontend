<template>
  <aside class="flex h-screen w-72 flex-col border-r border-slate-200 bg-slate-50/70 backdrop-blur">
    <div class="px-6 pb-5 pt-7">
      <RouterLink to="/" >

        <p class="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
          Workspace
        </p>
        <h1 class="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
          Lane Vantage
        </h1>

      </RouterLink>
      <div class="mt-5 h-px bg-slate-200" />
    </div>

    <nav class="flex-1 overflow-y-auto px-3">
      <ul class="space-y-5 pb-4">
      <li
        v-for="section in sidebarMenu"
        :key="section.section"
        class="rounded-2xl border border-slate-200/80 bg-white/90 p-3 shadow-sm shadow-slate-200/40"
      >
        <p
          v-if="section.section"
          class="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400"
        >
          {{ section.section }}
        </p>

        <ul class="space-y-1.5">
          <li
            v-for="item in section.items"
            :key="item.route"
            @click="$router.push({ name: item.route })"
            class="group flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900"
            :class="{
              'bg-slate-900 text-white shadow-sm shadow-slate-900/20 hover:bg-slate-900 hover:text-white':
                $route.name === item.route
            }"
          >
            <span>
              {{ item.label }}
            </span>
            <span
              class="h-1.5 w-1.5 rounded-full bg-slate-300 transition-colors group-hover:bg-slate-500"
              :class="{ 'bg-white': $route.name === item.route }"
            />
          </li>
        </ul>
      </li>
    </ul>
    </nav>

    <div class="border-t border-slate-200 p-4">
      <Button
        class="w-full justify-center border border-slate-200 !bg-white !text-slate-700 shadow-none hover:!bg-slate-50"
        @click="logout"
      >
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
      { label: 'Dashboard', route: 'dashboard' },
      { label: 'Boards', route: 'boards' },
      { label: 'Projects', route: 'projects' },
      { label: 'Tasks', route: 'tasks' }
    ]
  },
  {
    section: 'work',
    items: [
      { label: 'My Tasks', route: 'my-tasks' },
      { label: 'Due Today', route: 'tasks-today' },
      { label: 'Overdue', route: 'tasks-overdue' }
    ]
  },
  {
    section: 'settings',
    items: [
      { label: 'Profile', route: 'profile' },
      { label: 'Settings', route: 'settings' }
    ]
  }
]


</script>
