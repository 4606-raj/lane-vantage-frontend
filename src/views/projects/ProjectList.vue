<template>
  <div class="space-y-6">
    <section class="rounded-2xl border border-[var(--lv-border)] bg-[var(--lv-bg-surface)] p-6 shadow-[var(--lv-shadow-sm)]">
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p class="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--lv-text-faint)]">
            Workspace
          </p>
          <h1 class="mt-1 text-2xl font-semibold tracking-tight text-[var(--lv-text-primary)]">
            Projects
          </h1>
          <p class="mt-1 text-sm text-[var(--lv-text-muted)]">
            Track, filter, and manage your active work items.
          </p>
        </div>

        <router-link :to="{name: 'projects.create'}">
          <Button>
            <Plus class="w-4 h-4" />
            Add New
          </Button>
        </router-link>

      </div>
    </section>

    <section class="rounded-2xl border border-[var(--lv-border)] bg-[var(--lv-bg-surface)] p-4 shadow-[var(--lv-shadow-sm)] sm:p-5">
      <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div class="flex flex-1 flex-col gap-3 sm:flex-row">
          <label class="relative block w-full sm:max-w-md">
            <span class="pointer-events-none absolute left-3 top-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--lv-text-faint)]">
              Search
            </span>
            <input
              v-model="search"
              type="text"
              placeholder="Find a project"
              class="h-12 w-full rounded-xl border border-[var(--lv-input-border)] bg-[var(--lv-input-bg)] px-3 pt-4 text-sm text-[var(--lv-text-secondary)] outline-none transition focus:border-[var(--lv-input-border-focus)] focus:bg-[var(--lv-input-bg-focus)] focus:ring-2 focus:ring-[var(--lv-focus-ring)]"
            />
          </label>

          <label class="relative block w-full sm:w-56">
            <span class="pointer-events-none absolute left-3 top-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--lv-text-faint)]">
              Status
            </span>
            <select
              v-model="status"
              class="h-12 w-full appearance-none rounded-xl border border-[var(--lv-input-border)] bg-[var(--lv-input-bg)] px-3 pt-4 text-sm text-[var(--lv-text-secondary)] outline-none transition focus:border-[var(--lv-input-border-focus)] focus:bg-[var(--lv-input-bg-focus)] focus:ring-2 focus:ring-[var(--lv-focus-ring)]"
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

        <span class="self-start rounded-full bg-[var(--lv-bg-surface-muted)] px-3 py-1 text-xs font-semibold text-[var(--lv-text-muted)] md:self-center">
          {{ filteredProducts.length }} Results
        </span>
      </div>
    </section>

    <section class="overflow-hidden rounded-2xl border border-[var(--lv-border)] bg-[var(--lv-bg-surface)] shadow-[var(--lv-shadow-sm)]">
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-[var(--lv-bg-surface-soft)] text-[var(--lv-text-muted)]">
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
              class="border-t border-[var(--lv-border-soft)] transition hover:bg-[var(--lv-bg-surface-soft)]"
            >
              <td class="px-6 py-4 font-medium text-[var(--lv-text-primary)]">
                {{ product.name }}
              </td>

              <td class="px-6 py-4 text-[var(--lv-text-secondary)]">
                {{ product.category }}
              </td>

              <td class="px-6 py-4 font-medium text-[var(--lv-text-secondary)]">
                ₹{{ product.price }}
              </td>

              <td class="px-6 py-4">
                <span
                  class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold"
                  :class="product.status === 'active'
                    ? 'bg-[var(--lv-success-bg)] text-[var(--lv-success-text)]'
                    : 'bg-[var(--lv-bg-surface-muted)] text-[var(--lv-text-muted)]'"
                >
                  {{ product.status }}
                </span>
              </td>

              <td class="px-6 py-4 text-right">
                <div class="flex justify-end gap-2 text-xs font-semibold uppercase tracking-[0.1em]">
                  <Button
                    class="!border-[var(--lv-warning-bg)] !bg-[var(--lv-warning-bg)] !text-[var(--lv-warning-text)] hover:!opacity-90"
                    :onclick="() => $router.push({ name: 'product-edit', params: { id: product.id } })"
                  >
                    <Edit class="w-4 h-4" />
                  </Button>

                  <Button
                    class="!border-[var(--lv-danger-bg)] !bg-[var(--lv-danger-bg)] !text-[var(--lv-danger-text)] hover:!opacity-90"
                    :onclick="() => remove(product.id)"
                  >
                    <Trash class="w-4 h-4" />
                  </Button>
                </div>
              </td>
            </tr>

            <tr v-if="!filteredProducts.length">
              <td colspan="5" class="px-6 py-14 text-center text-sm text-[var(--lv-text-muted)]">
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
import { Edit, Plus, Trash } from 'lucide-vue-next'
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
