"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  updateProfile: (name: string, email: string) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Khôi phục phiên làm việc từ localStorage
    const savedUser = localStorage.getItem("atelier_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse saved user", e);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    if (!result.success) throw new Error(result.message);

    const userData = result.user;

    setUser(userData);
    localStorage.setItem("atelier_token", result.token);
    localStorage.setItem("atelier_user", JSON.stringify(userData));
  };

  const register = async (data: any) => {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!result.success) throw new Error(result.message);

    const userData = result.user;
    setUser(userData);
    localStorage.setItem("atelier_token", result.token);
    localStorage.setItem("atelier_user", JSON.stringify(userData));
  };

  const updateProfile = (name: string, email: string) => {
    if (!user) return;
    const updatedUser = { ...user, name, email };
    setUser(updatedUser);
    localStorage.setItem("atelier_user", JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("atelier_user");
    localStorage.removeItem("atelier_token");
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      updateProfile, 
      isAuthenticated: !!user,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
