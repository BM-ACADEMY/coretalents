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

      setUser({
        id: res.data.id || res.data._id,
        name: res.data.name,
        email: res.data.email,
        phone: res.data.phone,
        role: res.data.role,
        avatar: res.data.avatar,
        // 👇 CRITICAL FIX: Save subscription to state
        subscription: res.data.subscription
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

  const googleLoginHandler = async (credentialResponse) => {
    try {
      const res = await axiosInstance.post("/auth/google", {
        token: credentialResponse.credential,
      });

      showToast("success", "Google Login successful");

      // We should ideally call loadUser() here to ensure we get the subscription
      // But if we set it manually, include subscription if the backend sends it
      await loadUser();

      return res.data;
    } catch (err) {
      const msg = err.response?.data?.message || "Google Login failed";
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

  return (
    <AuthContext.Provider value={{
       user, setUser, loading, login, register, logout, googleLoginHandler,
       checkUser: loadUser // 👈 EXPORT THIS so we can refresh after payment
    }}>
      {children}
    </AuthContext.Provider>
  );
};
