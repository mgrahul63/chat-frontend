import { io } from "socket.io-client";

export const connectUserSocket = (backendUrl, userId, setOnlineUsers) => {
  const socket = io(backendUrl, { query: { userId } });

  socket.on("getOnlineUsers", (users) => {
    setOnlineUsers(users);
  });

  return socket;
};
