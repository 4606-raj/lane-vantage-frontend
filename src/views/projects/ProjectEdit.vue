<script setup lang="ts">
import { onMounted } from 'vue'
import ProjectForm from '@/components/forms/ProjectForm.vue'
import type { ProjectForm as ProjectFormType } from '@/schemas/project.schema'
import { useProjectStore } from '@/stores/project.store'
import { toaster } from '@/utils/toast'
import router from '@/router'
import { useRoute } from 'vue-router'

const projectStore = useProjectStore()
const route = useRoute()
const id = route.params.id

onMounted(async () => {
  await projectStore.fetchProject(Number(id))  
})

async function editProject(values: ProjectFormType) {
  try {
    console.log(values);
    

    const response = await projectStore.updateProject(Number(id), values)

    toaster.success(response.message)

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
      v-if="projectStore.project"
      canEdit="true"
      :initialValues="projectStore.project"
      @submit="editProject"
    />

  </div>
</template>
