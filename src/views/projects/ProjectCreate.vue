<script setup lang="ts">
import { ref } from 'vue'
import ProjectForm from '@/components/forms/ProjectForm.vue'
import type { ProjectForm as ProjectFormType } from '@/schemas/project.schema'
import { useProjectStore } from '@/stores/project.store'
import { toaster } from '@/utils/toast'
import { handleFormError } from '@/utils/form-error'
import router from '@/router'

const projectStore = useProjectStore()
const formRef = ref()

async function createProject(values: ProjectFormType) {
  try {
    const response = await projectStore.createProject(values)

    toaster.success(response.message)

    router.push({name: 'projects.list'})
  }
  catch(e: any) {
    handleFormError(e, formRef)
  }
}
</script>

<template>
  <div class="mx-auto p-6">

    <h1 class="text-xl font-semibold mb-6">
      Create Project
    </h1>

    <ProjectForm
      ref="formRef"
      :loading="projectStore.loading"
      @submit="createProject"
    />

  </div>
</template>
