// src/services/api.ts
/**
 * Axios instance for API calls with base URL and potentially auth headers.
 */
import axios from 'axios';
import { API_BASE_URL } from '@/config';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Example: Add an interceptor to include auth token
api.interceptors.request.use(
    (config) => {
        // Assuming token is stored in localStorage or a state management system
        const token = localStorage.getItem('authToken'); // Or retrieve from AuthContext state
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Example: Add an interceptor to handle 401 responses
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized: redirect to login, refresh token, etc.
            console.error('Unauthorized API access, redirecting to login...');
            // Example: window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);


export default api;
