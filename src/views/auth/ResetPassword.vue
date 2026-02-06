<template>
  <h1 class="text-2xl font-semibold mb-6 text-center">
    Reset Password
  </h1>

  <form @submit.prevent="submit" class="space-y-4">
    <input
      v-model="password"
      type="password"
      placeholder="Password"
      class="w-full border rounded px-3 py-2"
      required
    />

    <input
      v-model="confirmPassword"
      type="password"
      placeholder="Confirm Password"
      class="w-full border rounded px-3 py-2"
      required
    />

    <button
      type="submit"
      class="w-full bg-black text-white py-2 rounded hover:opacity-90 cursor-pointer"
    >
      Send Link
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import { toaster } from '@/utils/toast'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const token = ref<string>('')

onMounted(() => {
  const t = route.query.token
  if (!t || typeof t !== 'string') {
    errorMessage.value = 'Invalid or missing reset token'
    return
  }
  token.value = t
})

const submit = async () => {
  errorMessage.value = ''

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match'
    return
  }

  try {
    const response = await authStore.resetPassword({
      token: token.value,
      password: password.value
    })

    toaster.success(response)

    setTimeout(() => {
      router.push('/login')
    }, 3000)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    toaster.error(
    e?.response?.data?.message || 'Reset failed'
  )

  }
}
</script>
