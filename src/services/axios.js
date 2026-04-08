import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

// Request Interceptor (kept for future use)
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor (optional)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios Error:", error.message || error.response?.data);
    return Promise.reject(error.response?.data);
  },
);

export default api;
