import { defineStore } from 'pinia';
import { authService, type LoginPayload } from '@/services/auth.service';

export interface User {
    id: number,
    name: string,
    email: string,
};

interface AuthState {
    user: User | null,
    token: string | null,
    loading: boolean
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: null,
        token: localStorage.getItem('accessToken'),
        loading: false,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token
    },

    actions: {
        async login(payload: LoginPayload) {
            this.loading = true;

            const response = await authService.login(payload)
            
            this.token = response.accessToken;
            this.user = response.user;


            localStorage.setItem('accessToken', response.accessToken)
        }
    }
})