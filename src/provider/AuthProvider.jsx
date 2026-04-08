import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import {
  checkAuthAPI,
  loginAPI,
  logoutAPI,
  updateProfileAPI,
} from "../services/auth/api";
import { connectUserSocket } from "../services/auth/socket";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check if token is valid
  const checkAuth = async () => {
    try {
      const { data } = await checkAuthAPI();
      if (data.success) {
        setAuthUser(data.user);
        connectSocket(data.user);
      }
    } catch (error) {
      // toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Login handler  //login function to handle user authentication and socket connection
  const login = async (state, credential) => {
    try {
      const { data } = await loginAPI(state, credential);

      if (data.success) {
        setAuthUser(data.user);
        axios.defaults.headers.common["token"] = data.token;

        connectSocket(data.user);

        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      const { data } = await logoutAPI(); // backend logout
      if (data.success) {
        // Clear frontend state
        setAuthUser(null);
        setOnlineUsers([]);

        socket?.disconnect();
        toast.success("Logged out successfully");
      } else {
        toast.error("Logout failed: " + data.message);
        return;
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed: " + (error.message || "Server error"));
    }
  };

  //update profile
  const updateProfile = async (credential) => {
    
    try {
      const { data } = await updateProfileAPI(credential);

      if (data.success) {
        setAuthUser(data.user);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Connect socket //connect socket function to handle socket connection and online users updated
  const connectSocket = (userData) => {
    if (!userData) return;
    if (socket) return; // already connected

    const newSocket = connectUserSocket(
      backendUrl,
      userData._id,
      setOnlineUsers,
    );
    setSocket(newSocket);
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        checkAuth();
      }
      setLoading(false); // only stop loading after check
    };
    initAuth();
  }, []);

  const value = {
    axios,
    authUser,
    socket,
    onlineUsers,
    login,
    logout,
    loading,
    updateProfile,
  };

  return <AuthContext value={value}>{children}</AuthContext>;
};

export default AuthProvider;
