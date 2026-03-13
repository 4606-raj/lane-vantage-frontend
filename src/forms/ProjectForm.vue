<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import Input from '@/components/ui/form/Input.vue'
import Button from '@/components/ui/form/Button.vue'
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
  initialValues: props.initialValues
})

const [name, nameAttrs] = defineField('name')
const [description, descriptionAttrs] = defineField('description')

const onSubmit = handleSubmit((values) => {
  emit('submit', values)
})
</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-5">

    <!-- Project Name -->
    <section class="flex-1 overflow-y-auto p-6 rounded-2xl border border-[var(--lv-border)] bg-[var(--lv-bg-surface)] p-3 shadow-[var(--lv-shadow-sm)]">
      <label class="block text-sm font-medium mb-1">
        Project Name
      </label>

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

      <div class="flex justify-end">
        <!-- <Button>Back</Button> -->
        <Button type="submit" variant="success">Save</Button>
      </div>

    </section>

  </form>
</template>
