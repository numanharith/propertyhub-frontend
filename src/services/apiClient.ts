import axios from 'axios';
import { API_BASE_URL } from '@/config';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally if needed (e.g., 401 for logout)
    if (error.response && error.response.status === 401) {
      // localStorage.removeItem('authToken');
      // localStorage.removeItem('authUser');
      // Potentially redirect to login: window.location.href = '/auth';
      console.error('Unauthorized access - 401');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
