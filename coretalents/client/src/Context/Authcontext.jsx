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
      console.log("User loaded from /me:", res.data); // Debug log

      // Ensure the user object always has expected fields
      setUser({
        id: res.data.id || res.data._id,
        name: res.data.name || "",
        email: res.data.email || "",
        isAdmin: res.data.isAdmin || false, // Critical: explicitly set isAdmin
      });
    } catch (err) {
      console.log("No user logged in or error:", err.response?.data || err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const register = async (name, email, password) => {
    try {
      const res = await axiosInstance.post("/auth/register", { name, email, password });
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
      await loadUser(); // This will fetch full user with isAdmin
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
      showToast("error", "Logout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};