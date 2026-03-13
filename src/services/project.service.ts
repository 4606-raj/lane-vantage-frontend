import api from '@/services/http'

export interface CreateProjectPayload {
  name: string
  description?: string
}

export interface UpdateProjectPayload {
  name: string
  description?: string
}

export const projectService = {

  async getProjects() {
    const res = await api.get('/projects')
    return res.data
  },

  async getProject(id: number) {
    const res = await api.get(`/projects/${id}`)
    return res.data
  },

  async createProject(payload: CreateProjectPayload) {
    const res = await api.post('/projects', payload)
    return res.data
  },

  async updateProject(id: number, payload: UpdateProjectPayload) {
    const res = await api.patch(`/projects/${id}`, payload)
    return res.data
  },

  async deleteProject(id: number) {
    const res = await api.delete(`/projects/${id}`)
    return res.data
  }

}
