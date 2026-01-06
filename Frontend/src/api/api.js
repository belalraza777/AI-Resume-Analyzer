import axios from 'axios';

// Shared axios client for all requests (cookies carry tokens)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
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
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}/auth/refresh`,
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
