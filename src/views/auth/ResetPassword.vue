<template>
  <h1 class="text-2xl font-semibold mb-6 text-center">
    Reset Password
  </h1>

  <form @submit.prevent="submit" class="space-y-4">
    <input
      v-model="form.password"
      type="password"
      placeholder="Password"
      class="w-full border rounded px-3 py-2"
      required
    />

    <input
      v-model="form.passoword_confirmation"
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
import { reactive } from 'vue'
// import { useAuthStore } from '@/stores/auth.store'

// const authStore = useAuthStore()

const form = reactive({
  password: '',
  passoword_confirmation: ''
})

const submit = async () => {
//   const response = await authStore.login(form)
//   console.log(response);

}
</script>
