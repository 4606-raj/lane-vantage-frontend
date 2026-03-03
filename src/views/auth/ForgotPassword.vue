<template>
  <h1 class="text-2xl font-semibold mb-6 text-center">
    Forgot Password
  </h1>

  <form @submit.prevent="submit" class="space-y-4">
    <input
      v-model="email"
      type="email"
      placeholder="Email"
      class="w-full border rounded px-3 py-2"
      required
    />

    <Button type="submit" class="w-full">Send Link</Button>

    <div>
      <span>
        Go back to
        <RouterLink :to="{ name: 'login' }">Login</RouterLink>
      </span>
    </div>

  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import Button from '@/components/ui/form/Button.vue'

const authStore = useAuthStore()

const email = ref('')
const successMessage = ref('')
const errorMessage = ref('')

const submit = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  try {
    successMessage.value = await authStore.forgotPassword(email.value)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    errorMessage.value = e?.response?.data?.message || 'Something went wrong'
  }
}
</script>
