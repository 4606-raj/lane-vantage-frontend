<template>
  <aside class="flex h-screen w-72 flex-col border-r border-[var(--lv-border)] bg-[var(--lv-bg-sidebar)] text-[var(--lv-text-primary)] backdrop-blur">
    <div class="px-6 pb-5 pt-7">
      <RouterLink to="/" >

        <p class="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--lv-text-faint)]">
          Workspace
        </p>
        <h1 class="mt-2 text-2xl font-semibold tracking-tight text-[var(--lv-text-primary)]">
          Lane Vantage
        </h1>

      </RouterLink>
      <div class="mt-5 h-px bg-[var(--lv-border)]" />
    </div>

    <nav class="flex-1 overflow-y-auto px-3">
      <ul class="space-y-5 pb-4">
      <li
        v-for="section in sidebarMenu"
        :key="section.section"
        class="rounded-2xl border border-[var(--lv-border)] bg-[var(--lv-bg-surface)] p-3 shadow-[var(--lv-shadow-sm)]"
      >
        <p
          v-if="section.section"
          class="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--lv-text-faint)]"
        >
          {{ section.section }}
        </p>

        <ul class="space-y-1.5">
          <li
            v-for="item in section.items"
            :key="item.route"
            @click="$router.push({ name: item.route })"
            class="group flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-[var(--lv-bg-surface-soft)] hover:text-[var(--lv-text-primary)]"
            :class="{
              'bg-[var(--lv-accent)] text-[var(--lv-text-on-accent)] shadow-[var(--lv-shadow-sm)] hover:bg-[var(--lv-accent)] hover:text-[var(--lv-text-on-accent)]':
                $route.name === item.route
            }"
          >
            <span>
              {{ item.label }}
            </span>
            <span
              class="h-1.5 w-1.5 rounded-full bg-[var(--lv-text-faint)] transition-colors group-hover:bg-[var(--lv-text-muted)]"
              :class="{ 'bg-[var(--lv-text-on-accent)]': $route.name === item.route }"
            />
          </li>
        </ul>
      </li>
    </ul>
    </nav>

    <div class="space-y-3 border-t border-[var(--lv-border)] p-4">
      <Button
        class="w-full"
        @click="toggleTheme"
      >
        <component
          :is="theme === 'light' ? Moon : Sun"
          class="h-4 w-4"
        />
        <span>{{ theme === 'light' ? 'Dark Theme' : 'Light Theme' }}</span>
      </Button>

      <Button
        class="w-full"
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
import { resolveInitialTheme, setTheme, type Theme } from '@/utils/theme';
import { Moon, Sun } from 'lucide-vue-next'
import { ref } from 'vue';

const theme = ref<Theme>(resolveInitialTheme())

const toggleTheme = () => {
  const nextTheme: Theme = theme.value === 'light' ? 'dark' : 'light'
  theme.value = nextTheme
  setTheme(nextTheme)
}

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
