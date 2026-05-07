import api from "./http";

export interface LoginPayload {
    email: string,
    password: string,
}

export interface ResetPasswordPayload {
  token: string,
  password: string
}

export interface LoginResponse {
  accessToken: string
  user: {
    id: number
    name: string
    email: string
  }
}

export interface defaultResponse {
  message: string,
}

export const authService = {

    async login(payload: LoginPayload) {
      const response = await api.post('/auth/login', payload)
      return response.data
    },

    async forgotPassword(email: string) {
      const response = await api.post('/auth/forgot-password', {email})
      return response.data
    },

    async resetPassword(payload: ResetPasswordPayload) {

      const password = payload.password
      const token = payload.token

      const response = await api.post('/auth/reset-password', {token, password})
      return response.data
    },

    async logout(token: string) {
      const response = await api.post('/auth/logout', {token})
      return response.data
    }
}
