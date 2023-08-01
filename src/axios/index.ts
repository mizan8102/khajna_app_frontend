import axios from 'axios';
import router from '../router/index.js';
import { useTaskStore } from './../store/index';

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
  const taskStore = useTaskStore();
  config.headers.Authorization = `Bearer ${taskStore.user.token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('TOKEN');
      router.push({ name: 'Login' });
    } else if (error.response.status === 404) {
      router.push({ name: 'NotFound' });
    }
    throw error;
  }
);

export default axiosClient;
