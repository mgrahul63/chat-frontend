import api from "../axios";

export const checkAuthAPI = () => api.post("/api/auth/check");
export const loginAPI = (state, credential) =>
  api.post(`/api/auth/${state}`, credential);
export const logoutAPI = () => api.post("/api/auth/logout");
export const updateProfileAPI = (data) =>
  api.post("/api/auth/update-profile", data);

export const loginWithGoogleAPI = () => {
  window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`;
  
};
