<script setup lang="ts">
import Button from '@/components/ui/form/Button.vue'
import Input from '@/components/ui/form/Input.vue'
import Select from '@/components/ui/form/Select.vue'
import Table from '@/components/ui/Table.vue'
import { projectStatuses } from '@/utils/constants'
import { Edit, Filter, Plus, Trash } from 'lucide-vue-next'
import { computed, onMounted } from 'vue'
import { useProjectStore } from '@/stores/project.store'
import { ref } from 'vue'

const statusOptions = Object.values(projectStatuses).map(status => ({
  label: status,
  value: status
}))

const projectsStore = useProjectStore()

const deleteProject = async (id: number) => {
  if(confirm('Are you sure you want to delete this project?')) {
    await projectsStore.deleteProject(id)
  }
}

onMounted(async () => {
  await projectsStore.fetchProjects()
})

const search = ref('')
const status = ref('')
const showFilters = ref(false)

const products = computed(() =>
  (projectsStore.projects || []).filter(p => p && p.id)
)


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
          <p class="text-[11px] font-semibold uppercase `tra`cking-[0.22em] text-[var(--lv-text-faint)]">
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
            {{ products.length }} Results
          </span>
        </div>
    </section>

    <section class="overflow-hidden rounded-2xl border border-[var(--lv-border)] bg-[var(--lv-bg-surface)] shadow-[var(--lv-shadow-sm)]">
      <div class="overflow-x-auto">

        <Table :headers="headers" :items="products">

          <template #status="{ item }">
            <span class="font-semibold">
              {{ projectStatuses[item.status as keyof typeof projectStatuses] }}
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
                :onclick="() => deleteProject(item.id)"
              >
                <Trash class="w-4 h-4" />
              </Button>
            </div>
          </template>

        </Table>
        
      </div>
    </section>
  </div>

</template>