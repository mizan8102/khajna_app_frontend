import { defineStore } from 'pinia';
import axiosClient from '../axios';

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        user: {
            data: JSON.parse(localStorage.getItem('38979232349us734998er7450284')),
            token: localStorage.getItem('4628382to843ken983478382398428'),
            loading: false,
        },
    }),

    actions: {
        async login(user) {
            this.user.loading = true;
            try {
                const { data } = await axiosClient.post('/login', user);
                this.user.data = data.user;
                this.user.token = data.token;
                localStorage.setItem('38979232349us734998er7450284', JSON.stringify(data.user));
                localStorage.setItem('4628382to843ken983478382398428', data.token);
                this.user.loading = false;
                return data;
            } catch (error) {
                this.user.loading = false;
                throw error;
            }
        },
        logout() {
            return axiosClient.post('/logout').then((response) => {
                this.user.token = null;
                this.user.data = {};
                localStorage.removeItem('38979232349us734998er7450284');
                localStorage.removeItem('4628382to843ken983478382398428');
                return response;
            });
        },
    },
});
