import api from "../axios";

export const getFriendsAPI = async () => {
  try {
    const { data } = await api.get("/api/messages/users"); 
    return data;
  } catch (error) {
    console.error("Error fetching friends:", error);
    return [];
  }
};
export const getMessagesAPI = (id) => api.get(`/api/messages/${id}`);
export const sendMessagesAPI = (id, messageData) =>
  api.post(`/api/messages/send/${id}`, messageData);
export const sendMessageMarkAPI = (id) => api.put(`/api/messages/mark/${id}`);
export const updateProfileAPI = (data) =>
  api.post("/api/auth/update-profile", data);

export const getLastMessageAPI = (friendId) => api.get(`/api/messages/last/${friendId}`);
