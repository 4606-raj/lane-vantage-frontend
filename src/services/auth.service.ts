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

    login(payload: LoginPayload): Promise<LoginResponse> {
      return api.post('/auth/login', payload)
    },

    forgotPassword(email: string): Promise<defaultResponse> {
      return api.post('/auth/forgot-password', {email})
    },

    resetPassword(payload: ResetPasswordPayload): Promise<defaultResponse> {

      const password = payload.password
      const token = payload.token

      return api.post('/auth/reset-password', {token, password})
    },

    logout(token: string): Promise<defaultResponse> {
      return api.post('/auth/logout', {token})
    }
}
