<script setup lang="ts">
import Button from '@/components/ui/form/Button.vue'
import Input from '@/components/ui/form/Input.vue'
import Select from '@/components/ui/form/Select.vue'
import Table from '@/components/ui/Table.vue'
import { projectStatuses, type ProjectStatus } from '@/utils/constants'
import { Edit, Filter, Plus, Trash } from 'lucide-vue-next'
import { ref, computed } from 'vue'

interface Product {
  id: number
  name: string
  startDate?: string
  expectedEndDate?: string
  priority?: 'low' | 'medium' | 'high'
  status: ProjectStatus
}
const statusOptions = Object.values(projectStatuses).map(status => ({
  label: status,
  value: status
}))

const search = ref('')
const status = ref('')
const showFilters = ref(false)
const products = ref<Product[]>([
  { id: 1, name: 'Project Alpha', startDate: '2023-01-01', expectedEndDate: '2023-12-31', priority: 'high', status: 'Not Started' }
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

const headers = [
  { label: 'Id', key: 'id' },
  { label: 'Name', key: 'name' },
  { label: 'Start Date', key: 'startDate' },
  { label: 'Expected End Date', key: 'expectedEndDate' },
  { label: 'Priority', key: 'priority' },
  { label: 'Status', key: 'status' },
  { label: 'Actions', key: 'actions' }
]

</script>


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

        <div class="flex items-center gap-2">
          <Button :onClick="() => { showFilters = !showFilters }">
            <Filter class="w-4 h-4" />
          </Button>

          <router-link :to="{name: 'projects.create'}">
            <Button>
              <Plus class="w-4 h-4" />
              Add New
            </Button>
          </router-link>
        </div>

      </div>
    </section>

    <!-- Filters -->
    <section v-show="showFilters" class="flex gap-6 rounded-2xl border border-[var(--lv-border)] bg-[var(--lv-bg-surface)] p-4 shadow-[var(--lv-shadow-sm)] sm:p-5">
      <Input
          v-model="search"
          placeholder="Search projects..."
          class="w-1/2 md:w-1/6"
        />
        <Select
          v-model="status"
          :options="statusOptions"
          placeholder="All Status"
          class="w-1/2 md:w-1/6"
        />
        <div class="ml-auto flex items-center gap-2">
          <span class="self-center rounded-full bg-[var(--lv-bg-surface-muted)] px-3 py-1 text-xs font-semibold text-[var(--lv-text-muted)] md:self-center">
            {{ filteredProducts.length }} Results
          </span>
        </div>
    </section>

    <section class="overflow-hidden rounded-2xl border border-[var(--lv-border)] bg-[var(--lv-bg-surface)] shadow-[var(--lv-shadow-sm)]">
      <div class="overflow-x-auto">

        <Table :headers="headers" :items="filteredProducts">

          <template #status="{ item }">
            <span class="font-semibold">
              {{ item.status }}
            </span>
          </template>

          <!-- Actions column -->
          <template #actions="{ item }">
            <div class="flex justify-end gap-2 text-xs font-semibold uppercase tracking-[0.1em]">
              <router-link :to="{name: 'projects.edit', params: { id: item.id } }">
                <Button
                  class="!border-[var(--lv-warning-bg)] !bg-[var(--lv-warning-bg)] !text-[var(--lv-warning-text)] hover:!opacity-90"
                >
                  <Edit class="w-4 h-4" />
                </Button>
              </router-link>

              <Button
                class="!border-[var(--lv-danger-bg)] !bg-[var(--lv-danger-bg)] !text-[var(--lv-danger-text)] hover:!opacity-90"
                :onclick="() => remove(item.id)"
              >
                <Trash class="w-4 h-4" />
              </Button>
            </div>
          </template>

        </Table>
        
        <!-- <table class="min-w-full text-sm">
          <thead class="bg-[var(--lv-bg-surface-soft)] text-[var(--lv-text-muted)]">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em]">
                Id
              </th>
              <th class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em]">
                Name
              </th>
              <th class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em]">
                Start Date
              </th>
              <th class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em]">
                Expected End Date
              </th>
              <th class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em]">
                Priority
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
                {{ product.id }}
              </td>

              <td class="px-6 py-4 text-[var(--lv-text-secondary)]">
                {{ product.name }}
              </td>

              <td class="px-6 py-4 font-medium text-[var(--lv-text-secondary)]">
                {{ product.startDate }}
              </td>

              <td class="px-6 py-4 font-medium text-[var(--lv-text-secondary)]">
                {{ product.expectedEndDate }}
              </td>

              <td class="px-6 py-4 font-medium text-[var(--lv-text-secondary)]">
                {{ product.priority }}
              </td>

              <td class="px-6 py-4">
                <span
                  class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold"
                >
                  {{ product.status }}
                </span>
              </td>

              <td class="px-6 py-4 text-right">
                <div class="flex justify-end gap-2 text-xs font-semibold uppercase tracking-[0.1em]">
                  <router-link :to="{name: 'projects.edit', params: { id: product.id } }">
                    <Button
                      class="!border-[var(--lv-warning-bg)] !bg-[var(--lv-warning-bg)] !text-[var(--lv-warning-text)] hover:!opacity-90"
                    >
                      <Edit class="w-4 h-4" />
                    </Button>
                  </router-link>

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
        </table> -->

      </div>
    </section>
  </div>

</template>