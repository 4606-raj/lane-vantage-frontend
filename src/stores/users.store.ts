import { userService } from '@/services/user.service'
import { defineStore } from 'pinia'

export interface User {
    id: number
    uuid: string
    name: string
    email: string
}

interface UserState {
    users: User[]
    user: User | null
    loading: boolean
}

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        users: [],
        user: null,
        loading: false
    }),

    getters: {
      hasUsers: (state) => state.users.length > 0
    },

    actions: {
        async fetchUsers() {
            this.loading = true

            try {
                const res = await userService.getAll()
                this.users = res.data
            } finally {
                this.loading = false
            }
        }
    }
})