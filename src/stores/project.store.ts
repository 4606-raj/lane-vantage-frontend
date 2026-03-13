import { defineStore } from 'pinia'
import { projectService, type CreateProjectPayload, type UpdateProjectPayload } from '@/services/project.service'

export interface Project {
  id: number
  name: string
  description?: string
  createdAt: string
}

interface ProjectState {
  projects: Project[]
  project: Project | null
  loading: boolean
}

export const useProjectStore = defineStore('project', {
  state: (): ProjectState => ({
    projects: [],
    project: null,
    loading: false
  }),

  getters: {
    hasProjects: (state) => state.projects.length > 0
  },

  actions: {

    async fetchProjects() {
      this.loading = true

      try {
        const res = await projectService.getProjects()
        this.projects = res
      } finally {
        this.loading = false
      }
    },

    async fetchProject(id: number) {
      this.loading = true

      try {
        const res = await projectService.getProject(id)
        this.project = res
      } finally {
        this.loading = false
      }
    },

    async createProject(payload: CreateProjectPayload) {
      this.loading = true

      try {
        const res = await projectService.createProject(payload)

        this.projects.push(res)

        return { message: 'Project created successfully' }
      } finally {
        this.loading = false
      }
    },

    async updateProject(id: number, payload: UpdateProjectPayload) {
      this.loading = true

      try {
        const res = await projectService.updateProject(id, payload)

        const index = this.projects.findIndex(p => p.id === id)

        if (index !== -1) {
          this.projects[index] = res
        }

        return { message: 'Project updated successfully' }
      } finally {
        this.loading = false
      }
    },

    async deleteProject(id: number) {
      this.loading = true

      try {
        await projectService.deleteProject(id)

        this.projects = this.projects.filter(p => p.id !== id)

        return { message: 'Project deleted successfully' }
      } finally {
        this.loading = false
      }
    }
  }
})
