import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isElderly, setIsElderly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 🔹 Check user on reload using token
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me");

        setUser(res.data.user);
        setIsAuthenticated(true);
        setIsElderly(res.data.user.age > 55);
      } catch (error) {
        console.log("No valid session");
        localStorage.removeItem("token");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  // 🔹 LOGIN (CALL BACKEND)
  const login = async (email, password) => {
    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);

      setUser(res.data.user);
      setIsAuthenticated(true);
      setIsElderly(res.data.user.age > 55);

      return { success: true, message: res.data.message };

    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login failed"
      };
    }
  };

  // 🔹 SIGNUP (CALL BACKEND)
  const signup = async (data) => {
    try {
      const res = await API.post("/auth/register", data);

      localStorage.setItem("token", res.data.token);

      setUser(res.data.user);
      setIsAuthenticated(true);
      setIsElderly(res.data.user.age > 55);

      return { success: true, message: res.data.message };

    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Signup failed"
      };
    }
  };

  // 🔹 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    setIsElderly(false);
  };

  const value = {
    user,
    isAuthenticated,
    isElderly,
    isLoading,
    login,
    signup,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};