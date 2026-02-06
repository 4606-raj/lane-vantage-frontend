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

export interface forgotPasswordResponse {
  message: string,
}

export const authService = {

    login(payload: LoginPayload): Promise<LoginResponse> {
      return api.post('/auth/login', payload)
    },

    forgotPassword(email: string): Promise<forgotPasswordResponse> {
      return api.post('/auth/forgot-password', {email})
    },

    resetPassword(payload: ResetPasswordPayload): Promise<forgotPasswordResponse> {

      const password = payload.password
      const token = payload.token
      
      return api.post('/auth/reset-password', {token, password})
    }
}