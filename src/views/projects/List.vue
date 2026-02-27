<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="space-y-6">
    <section class="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50">
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p class="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
            Workspace
          </p>
          <h1 class="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Projects
          </h1>
          <p class="mt-1 text-sm text-slate-500">
            Track, filter, and manage your active work items.
          </p>
        </div>
        <Button
          class="!rounded-xl border border-slate-200 !bg-white !px-4 !py-2.5 !text-slate-700 shadow-none hover:!bg-slate-50"
          @click="() => {}"
        >
          Add New
        </Button>
      </div>
    </section>

    <section class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/50 sm:p-5">
      <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div class="flex flex-1 flex-col gap-3 sm:flex-row">
          <label class="relative block w-full sm:max-w-md">
            <span class="pointer-events-none absolute left-3 top-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Search
            </span>
            <input
              v-model="search"
              type="text"
              placeholder="Find a project"
              class="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 pt-4 text-sm text-slate-700 outline-none transition focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-200"
            />
          </label>

          <label class="relative block w-full sm:w-56">
            <span class="pointer-events-none absolute left-3 top-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Status
            </span>
            <select
              v-model="status"
              class="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/70 px-3 pt-4 text-sm text-slate-700 outline-none transition focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-200"
            >
              <option value="">
                All Status
              </option>
              <option value="active">
                Active
              </option>
              <option value="inactive">
                Inactive
              </option>
            </select>
          </label>
        </div>

        <span class="self-start rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500 md:self-center">
          {{ filteredProducts.length }} Results
        </span>
      </div>
    </section>

    <section class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/50">
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-slate-50/90 text-slate-500">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em]">
                Project
              </th>
              <th class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em]">
                Category
              </th>
              <th class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em]">
                Budget
              </th>
              <th class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em]">
                Status
              </th>
              <th class="px-6 py-3 text-right text-xs font-semibold uppercase tracking-[0.16em]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="product in filteredProducts"
              :key="product.id"
              class="border-t border-slate-100 transition hover:bg-slate-50/70"
            >
              <td class="px-6 py-4 font-medium text-slate-900">
                {{ product.name }}
              </td>

              <td class="px-6 py-4 text-slate-600">
                {{ product.category }}
              </td>

              <td class="px-6 py-4 font-medium text-slate-700">
                ₹{{ product.price }}
              </td>

              <td class="px-6 py-4">
                <span
                  class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold"
                  :class="product.status === 'active'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-slate-200 text-slate-600'"
                >
                  {{ product.status }}
                </span>
              </td>

              <td class="px-6 py-4 text-right">
                <div class="flex justify-end gap-4 text-xs font-semibold uppercase tracking-[0.1em]">
                  <button
                    class="text-slate-500 transition hover:text-slate-900"
                    @click="$router.push({ name: 'product-edit', params: { id: product.id } })"
                  >
                    Edit
                  </button>

                  <button
                    class="text-rose-500 transition hover:text-rose-700"
                    @click="remove(product.id)"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="!filteredProducts.length">
              <td colspan="5" class="px-6 py-14 text-center text-sm text-slate-500">
                No projects found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
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
