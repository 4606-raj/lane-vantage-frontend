import api from '@/services/http'

export const userService = {
  getAll: () => api.get('/users'),
}
