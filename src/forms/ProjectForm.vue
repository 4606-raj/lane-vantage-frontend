<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import Input from '@/components/ui/form/Input.vue'
import Button from '@/components/ui/form/Button.vue'
import Select from '@/components/ui/form/Select.vue'
import { projectSchema, type ProjectForm } from '@/schemas/project.schema'

const props = defineProps<{
  initialValues?: Partial<ProjectForm>
  loading?: boolean
}>()

const emit = defineEmits<{
  submit: [values: ProjectForm]
}>()

const { handleSubmit, errors, defineField } = useForm<ProjectForm>({
  validationSchema: toTypedSchema(projectSchema),
  initialValues: {
    status: 'not_started',
    priority: 'medium',
    teamMembers: [],
    ...props.initialValues
  }
})

const [name, nameAttrs] = defineField('name')
const [description, descriptionAttrs] = defineField('description')
const [date, dateAttrs] = defineField('date')
const [expectedEndDate, expectedEndDateAttrs] = defineField('expectedEndDate')
const [status, statusAttrs] = defineField('status')
const [priority, priorityAttrs] = defineField('priority')
const [owner, ownerAttrs] = defineField('owner')
const [client, clientAttrs] = defineField('client')
const [teamMembers, teamMembersAttrs] = defineField('teamMembers')

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
          v-bind="nameAttrs"
          label="Name"
          />
          
          <Input
          v-model="description"
          :error="errors.description"
          v-bind="descriptionAttrs"
          label="Description"
          />
        </div>

        <div class="flex gap-4">
          <Input
            v-model="date"
            :error="errors.date"
            v-bind="dateAttrs"
            label="Date"
            type="date"
          />
          <Input
            v-model="expectedEndDate"
            :error="errors.expectedEndDate"
            v-bind="expectedEndDateAttrs"
            label="Expected End Date"
            type="date"
          />

          <Select
            v-model="status"
            :error="errors.status"
            v-bind="statusAttrs"
            label="Status"
            :options="[
              { label: 'Not Started', value: 'not_started' },
              { label: 'In Progress', value: 'in_progress' },
              { label: 'Completed', value: 'completed' },
            ]"
          />

          <Select
            v-model="priority"
            :error="errors.priority"
            v-bind="priorityAttrs"
            label="Priority"
            :options="[
              { label: 'Low', value: 'low' },
              { label: 'Medium', value: 'medium' },
              { label: 'High', value: 'high' },
            ]"
          />
        </div>

        <div class="flex gap-4">
          <Input
            v-model="owner"
            :error="errors.owner"
            v-bind="ownerAttrs"
            label="Owner"
          />

          <Select
            v-model="client"
            :error="errors.client"
            v-bind="clientAttrs"
            label="Client"
            :options="[
              { label: 'Client A', value: 'client_a' },
              { label: 'Client B', value: 'client_b' },
              { label: 'Client C', value: 'client_c' },
            ]"
          />
        </div>

        <div class="flex gap-4">
          <Select
            v-model="teamMembers"
            :error="errors.teamMembers"
            v-bind="teamMembersAttrs"
            label="Team Members"
            :options="[
              { label: 'Member A', value: 'member_a' },
              { label: 'Member B', value: 'member_b' },
              { label: 'Member C', value: 'member_c' },
            ]"
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
