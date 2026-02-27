<template>
  <h1 class="text-2xl font-semibold mb-6 text-center">
    Login
  </h1>

  <form @submit.prevent="submit" class="space-y-4">
    <input
      v-model="form.email"
      type="email"
      placeholder="Email"
      class="w-full border rounded px-3 py-2"
      required
    />

    <input
      v-model="form.password"
      type="password"
      placeholder="Password"
      class="w-full border rounded px-3 py-2"
      required
    />

    <button
      type="submit"
      :disabled="uiStore.getButtonLoader"
      class="flex w-full items-center justify-center gap-2 rounded bg-black py-2 text-white transition-opacity"
      :class="uiStore.getButtonLoader ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:opacity-90'"
    >
      <svg
        v-if="uiStore.getButtonLoader"
        class="h-4 w-4 animate-spin"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
          fill="none"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      <span>{{ uiStore.getButtonLoader ? 'Signing in...' : 'Sign in' }}</span>
    </button>

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
import { useUIStore } from '@/stores/ui.store'

const uiStore = useUIStore()

const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: '',
})

const submit = async () => {
  uiStore.setButtonLoader(true)

  try {
    const response = await authStore.login(form)
    toaster.success(response.message)

    router.push({name: 'home'})
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch(e: any) {
    toaster.error(e.message)
  } finally {
    uiStore.setButtonLoader(false)
  }
}
</script>
