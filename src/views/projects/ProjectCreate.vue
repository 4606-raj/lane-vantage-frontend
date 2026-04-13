<script setup lang="ts">
import ProjectForm from '@/components/forms/ProjectForm.vue'
import type { ProjectForm as ProjectFormType } from '@/schemas/project.schema'
import { useProjectStore } from '@/stores/project.store'
import { toaster } from '@/utils/toast'
import router from '@/router'

const projectStore = useProjectStore()

async function createProject(values: ProjectFormType) {
  try {
    const response = await projectStore.createProject(values)

    toaster.success(response.message)

    router.push({name: 'projects.list'})
  }
  catch(e: any) {
    toaster.error(e.response.data.message || e.message)
  }
}
</script>

<template>
  <div class="mx-auto p-6">

    <h1 class="text-xl font-semibold mb-6">
      Create Project
    </h1>

    <ProjectForm
      :loading="projectStore.loading"
      @submit="createProject"
    />

  </div>
</template>
