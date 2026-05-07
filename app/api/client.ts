import axios from 'axios';
import { getCsrfToken } from './csrf';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Version': '1',
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const csrfToken = getCsrfToken();

    if (
      csrfToken &&
      config.method &&
      ['post', 'put', 'patch', 'delete'].includes(config.method.toLowerCase())
    ) {
      config.headers['X-CSRF-Token'] = csrfToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem('insighta_user');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
