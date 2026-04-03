<script setup lang="ts">
import ProjectForm from '@/components/forms/ProjectForm.vue'
import type { ProjectForm as ProjectFormType } from '@/schemas/project.schema'
import { useProjectStore } from '@/stores/project.store'
import { toaster } from '@/utils/toast'
import router from '@/router'

const projectStore = useProjectStore()

async function editProject(values: ProjectFormType) {
  try {
    console.log(values);
    

    // const response = await projectStore.editProject(values)

    // toaster.success(response.message)

    router.push({name: 'projects.list'})
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
      Edit Project
    </h1>

    <ProjectForm
      :loading="projectStore.loading"
      canEdit="true"
      @submit="editProject"
    />

  </div>
</template>
