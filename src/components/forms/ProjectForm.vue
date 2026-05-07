<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import Input from '@/components/ui/form/Input.vue'
import Button from '@/components/ui/form/Button.vue'
import Select from '@/components/ui/form/Select.vue'
import { projectSchema, type ProjectForm } from '@/schemas/project.schema'
import DatePicker from '@/components/ui/form/DatePicker.vue'
import { computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/users.store'
import { projectStatuses, projectPriorities } from '@/utils/constants'

const props = defineProps<{
  initialValues?: Partial<ProjectForm> | null
  loading?: boolean
}>()

const emit = defineEmits<{
  submit: [values: ProjectForm]
}>()

// form setup
const { handleSubmit, errors, defineField } = useForm<ProjectForm>({
  validationSchema: toTypedSchema(projectSchema),
  initialValues: {
    status: 'not_started',
    priority: 'medium',
    teamMembers: [],
    ...props.initialValues
  }
})

const projectStatusOptions = Object.entries(projectStatuses).map(([key, v]) => ({
    label: v,
    value: key
}));

const priorityOptions = Object.entries(projectPriorities).map(([key, v]) => ({
    label: v,
    value: key
}));

// form fields
const [name] = defineField('name')
const [description] = defineField('description')
const [date] = defineField('startDate')
const [expectedEndDate] = defineField('expectedEndDate')
const [status] = defineField('status')
const [priority] = defineField('priority')
const [teamMembers] = defineField('teamMembers')

// fetch users for team members select
const userStore = useUserStore()

onMounted(async () => {
  await userStore.fetchUsers()
})

// map users to select options
const users = computed(() => {
  return userStore.users.map(user => ({
    label: user.name,
    value: user.id
  }))
})

const onSubmit = handleSubmit((values) => {
  emit('submit', values)
})
</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-5">

    <!-- Project Name -->
    <section class="flex-1 overflow-y-auto p-6 rounded-2xl border border-[var(--lv-border)] bg-[var(--lv-bg-surface)] p-3 shadow-[var(--lv-shadow-sm)]">

      <div class="w-full">

        <div class="flex gap-4">
          <Input
          v-model="name"
          :error="errors.name"
          label="Name"
          />
          
          <Input
          v-model="description"
          :error="errors.description"
          label="Description"
          />
        </div>

        <div class="flex gap-4">
          <DatePicker
            v-model="date"            
            :error="errors.startDate"
            label="Start Date"
          />

          <DatePicker
            v-model="expectedEndDate"
            :error="errors.expectedEndDate"
            label="Expected End Date"
          />

          <Select
            v-model="status"
            :error="errors.status"
            label="Status"
            :options="projectStatusOptions"
          />

          <Select
            v-model="priority"
            :error="errors.priority"
            label="Priority"
            :options="priorityOptions"
          />
        </div>

        <div class="flex gap-4">
          <Select
            v-model="teamMembers"
            :error="errors.teamMembers"
            label="Team Members"
            :multiple="true"
            :options="users"
          />
        </div>
      </div>

      <div class="flex justify-end">
        <!-- <Button>Back</Button> -->
        <Button type="submit" variant="success">Save</Button>
      </div>

    </section>

  </form>
</template>
