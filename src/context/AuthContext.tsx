import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { UserDetails, UserLoginRequest, AuthResponse } from '@/types/api';
import * as authService from '@/services/authService';

interface AuthContextType {
  user: UserDetails | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: UserLoginRequest) => Promise<void>;
  logout: () => void;
  register: (userData: any) => Promise<void>; // Use specific type later
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('authUser');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: UserLoginRequest) => {
    try {
      setIsLoading(true);
      const response: AuthResponse = await authService.login(credentials);
      setUser(response.user);
      setToken(response.jwtToken);
      localStorage.setItem('authToken', response.jwtToken);
      localStorage.setItem('authUser', JSON.stringify(response.user));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (userData: any) => {
    try {
      setIsLoading(true);
      await authService.register(userData);
      setIsLoading(false);
      // Optionally, redirect to login or show success message
    } catch (error) {
      setIsLoading(false);
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
