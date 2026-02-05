import api from "./http";

export interface LoginPayload {
    email: string,
    password: string,
}

export const authService = {

    login(payload: LoginPayload) {
        return api.post('/auth/login', payload)
    }
}