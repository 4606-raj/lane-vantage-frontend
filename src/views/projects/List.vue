<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="p-6 space-y-6">
    <!-- App Bar -->
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-medium text-gray-900">Products</h1>

      <Button @click="() => {}">Add New +</Button>

    </div>

    <!-- Filters (Material style) -->
    <div class="flex gap-4">
      <div class="relative">
        <input
          v-model="search"
          type="text"
          placeholder=" "
          class="peer w-72 px-3 pt-5 pb-2 text-sm border rounded
                 focus:outline-none focus:ring-0 focus:border-blue-600"
        />
        <label
          class="absolute left-3 top-2 text-xs text-gray-500
                 peer-placeholder-shown:top-3.5
                 peer-placeholder-shown:text-sm
                 peer-focus:top-2
                 peer-focus:text-xs
                 peer-focus:text-blue-600
                 transition-all"
        >
          Search products
        </label>
      </div>

      <select
        v-model="status"
        class="px-3 py-3 text-sm border rounded
               focus:outline-none focus:border-blue-600"
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>

    <!-- Material Card -->
    <div class="bg-white rounded-lg shadow">
      <table class="w-full text-sm">
        <thead class="border-b text-gray-600">
          <tr>
            <th class="px-6 py-4 font-medium text-left">Product</th>
            <th class="px-6 py-4 font-medium text-left">Category</th>
            <th class="px-6 py-4 font-medium text-left">Price</th>
            <th class="px-6 py-4 font-medium text-left">Status</th>
            <th class="px-6 py-4 font-medium text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="product in filteredProducts"
            :key="product.id"
            class="border-b last:border-b-0 hover:bg-gray-100 transition"
          >
            <td class="px-6 py-4 font-medium text-gray-900">
              {{ product.name }}
            </td>

            <td class="px-6 py-4 text-gray-600">
              {{ product.category }}
            </td>

            <td class="px-6 py-4">
              ₹{{ product.price }}
            </td>

            <td class="px-6 py-4">
              <span
                class="px-3 py-1 text-xs rounded-full font-medium"
                :class="product.status === 'active'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-200 text-gray-600'"
              >
                {{ product.status }}
              </span>
            </td>

            <td class="px-6 py-4 text-right">
              <div class="flex justify-end gap-3">
                <button
                  class="text-blue-600 hover:underline"
                  @click="$router.push({ name: 'product-edit', params: { id: product.id } })"
                >
                  Edit
                </button>

                <button
                  class="text-red-600 hover:underline"
                  @click="remove(product.id)"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>

          <tr v-if="!filteredProducts.length">
            <td colspan="5" class="px-6 py-12 text-center text-gray-500">
              No products found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/form/Button.vue'
import { ref, computed } from 'vue'

interface Product {
  id: number
  name: string
  category: string
  price: number
  status: 'active' | 'inactive'
}

const search = ref('')
const status = ref('')

const products = ref<Product[]>([
  { id: 1, name: 'Task Manager Pro', category: 'Software', price: 1999, status: 'active' },
  { id: 2, name: 'Analytics Add-on', category: 'Addon', price: 999, status: 'inactive' },
  { id: 3, name: 'Team Pack', category: 'Subscription', price: 4999, status: 'active' }
])

const filteredProducts = computed(() =>
  products.value.filter(p =>
    p.name.toLowerCase().includes(search.value.toLowerCase()) &&
    (!status.value || p.status === status.value)
  )
)

const remove = (id: number) => {
  products.value = products.value.filter(p => p.id !== id)
}
</script>
