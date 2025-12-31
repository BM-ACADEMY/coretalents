import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance.jsx";
import { showToast } from "../utils/customToast.jsx";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const res = await axiosInstance.get("/auth/me");
      // Ensure we capture the role and phone correctly
      setUser({
        id: res.data.id || res.data._id,
        name: res.data.name,
        email: res.data.email,
        phone: res.data.phone,
        role: res.data.role, // "admin" or "user"
      });
    } catch (err) {
      console.log(err);
      
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  // Updated to include phone
  const register = async (name, email, password, phone) => {
    try {
      const res = await axiosInstance.post("/auth/register", { name, email, password, phone });
      showToast("success", res.data.message || "Registered successfully");
      await loadUser();
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      showToast("error", msg);
      throw err;
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      showToast("success", res.data.message || "Login successful");
      await loadUser();
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      showToast("error", msg);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setUser(null);
      showToast("success", "Logged out successfully");
    } catch (err) {
      console.log(err);
      
      showToast("error", "Logout failed");
    }
  };
const googleLoginHandler = async (credentialResponse) => {
    try {
      const res = await axiosInstance.post("/auth/google", {
        token: credentialResponse.credential, // Send Google token to backend
      });
      
      showToast("success", "Google Login successful");
      
      setUser({
        id: res.data.user.id,
        name: res.data.user.name,
        email: res.data.user.email,
        phone: res.data.user.phone,
        role: res.data.user.role,
        avatar: res.data.user.avatar,
      });

      return res.data;
    } catch (err) {
      const msg = err.response?.data?.message || "Google Login failed";
      showToast("error", msg);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ 
       user, setUser, loading, login, register, logout, 
       googleLoginHandler // Export this
    }}>
      {children}
    </AuthContext.Provider>
  );
};