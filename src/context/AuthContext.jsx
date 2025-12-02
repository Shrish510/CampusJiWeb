// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage on mount (mimicking legacy behavior)
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      const storedUser = localStorage.getItem('userInfo');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login logic from legacy js/login.js
    const userInfo = {
        email: email,
        loginTime: new Date().toISOString(),
        isLoggedIn: true,
      };

      if (email === "parceldude@gmail.com" && password === "parcel") {
        userInfo.permission = "parcel";
        userInfo.role = "parcel_service";
        userInfo.name = "Parcel Service";
      } else if (email === "admin.iimrohtak@gmail.com") {
        userInfo.permission = "admin";
        userInfo.role = "admin";
        userInfo.name = "Admin";
      } else {
        userInfo.permission = "user";
        userInfo.role = "student";
        userInfo.name = email.split("@")[0];
      }

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      setUser(userInfo);
      return true;
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
