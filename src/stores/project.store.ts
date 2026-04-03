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
        const res = await projectService.getAll()
        this.projects = res
      } finally {
        this.loading = false
      }
    },

    async fetchProject(id: number) {
      this.loading = true

      try {
        const res = await projectService.getOne(id)
        this.project = res
      } finally {
        this.loading = false
      }
    },

    async createProject(payload: CreateProjectPayload) {
      this.loading = true

      try {
        const res = await projectService.create(payload)

        this.projects.push(res)

        return { message: 'Project created successfully' }
      } finally {
        this.loading = false
      }
    },

    async editProject(id: number) {
      this.loading = true

      try {
        const res = await projectService.getOne(id)
        this.project = res
      } finally {
        this.loading = false
      }
    },

    async updateProject(id: number, payload: UpdateProjectPayload) {
      this.loading = true

      try {
        const res = await projectService.update(id, payload)

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
        await projectService.delete(id)

        this.projects = this.projects.filter(p => p.id !== id)

        return { message: 'Project deleted successfully' }
      } finally {
        this.loading = false
      }
    }
  }
})
