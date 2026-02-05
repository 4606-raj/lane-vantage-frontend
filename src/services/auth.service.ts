import api from "./http";

export interface LoginPayload {
    email: string,
    password: string,
}

export interface LoginResponse {
  accessToken: string
  user: {
    id: number
    name: string
    email: string
  }
}

export const authService = {

    login(payload: LoginPayload): Promise<LoginResponse> {
      return api.post('/auth/login', payload)
    }
}