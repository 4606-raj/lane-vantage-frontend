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
      class="w-full bg-black text-white py-2 rounded hover:opacity-90 cursor-pointer"
    >
      Sign in
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
