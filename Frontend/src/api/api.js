import axios from 'axios';

const API_BASE_URL = (import.meta && import.meta.env && import.meta.env.BACKEND_API_URL) || (typeof process !== 'undefined' && process.env && process.env.BACKEND_API_URL) || "http://localhost:5000/api/v1";

// Shared axios client for all requests (cookies carry tokens)
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Interceptor: on 401, refresh the token once then retry the original request 
//It is like a middleware that intercepts responses from the server
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    // Skip refresh logic for auth endpoints to prevent loops
    const isAuthEndpoint = originalRequest.url?.includes('/auth/');
    
    if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      originalRequest._retry = true;
      try {
        await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        return api(originalRequest);
      } catch {
        // Refresh failed - let the app handle logout naturally
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
