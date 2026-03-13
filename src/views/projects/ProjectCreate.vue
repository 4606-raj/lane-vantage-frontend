<script setup lang="ts">
import ProjectForm from '@/forms/ProjectForm.vue'
import type { ProjectForm as ProjectFormType } from '@/schemas/project.schema'
import { useProjectStore } from '@/stores/project.store'
import { toaster } from '@/utils/toast'
import { useRouter } from 'vue-router'

const projectStore = useProjectStore()

async function createProject(values: ProjectFormType) {
  try {

    const response = await projectStore.createProject(values)
    const router = useRouter();

    toaster.success(response.message)

    router.push({name: 'home'})
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch(e: any) {
    toaster.error(e.message)
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
