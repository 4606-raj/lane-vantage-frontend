<template>
  <h1 class="text-2xl font-semibold mb-6 text-center">
    Login
  </h1>

  <form @submit.prevent="submit" class="space-y-4">
    <input
      v-model="form.email"
      type="email"
      placeholder="Email"
      class="h-12 w-full rounded-xl border border-[var(--lv-input-border)] bg-[var(--lv-input-bg)] px-3 text-[var(--lv-text-secondary)] outline-none transition focus:border-[var(--lv-input-border-focus)] focus:bg-[var(--lv-input-bg-focus)] focus:ring-2 focus:ring-[var(--lv-focus-ring)]"
      required
    />

    <input
      v-model="form.password"
      type="password"
      placeholder="Password"
      class="h-12 w-full rounded-xl border border-[var(--lv-input-border)] bg-[var(--lv-input-bg)] px-3 text-[var(--lv-text-secondary)] outline-none transition focus:border-[var(--lv-input-border-focus)] focus:bg-[var(--lv-input-bg-focus)] focus:ring-2 focus:ring-[var(--lv-focus-ring)]"
      required
    />

    <Button type="submit" class="w-full justify-center">Sign In</Button>

    <div>
      <router-link :to="{name: 'forgot-password'}">Forgot Password ?</router-link>
    </div>

  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import { toaster } from '@/utils/toast'
import router from '@/router'
import Button from '@/components/ui/form/Button.vue'

const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: '',
})

const submit = async () => {

  try {
    const response = await authStore.login(form)
    toaster.success(response.message)

    router.push({name: 'home'})
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch(e: any) {
    toaster.error(e.message)
  }
}
</script>
