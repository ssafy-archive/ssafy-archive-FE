import axios from 'axios';
import { setupInterceptors } from './interceptors';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

setupInterceptors(api);

export default api;
