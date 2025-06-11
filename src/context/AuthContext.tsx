import React, { createContext, useState, useEffect, ReactNode } from "react";
import { UserDetails, UserLoginRequest, AuthResponse, AgentTierDto, UserSubscriptionDto, UserDashboardResponse } from "../types/api";
import * as authService from "../services/authService";

interface AuthContextType {
  user: UserDetails | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  userType: string | null;
  login: (credentials: UserLoginRequest) => Promise<void>;
  logout: () => void;
  register: (userData: any) => Promise<void>; // Use specific type later
  dashboardData: UserDashboardResponse | null;
  userTier: AgentTierDto | null;
  userSubscription: UserSubscriptionDto | null;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("authToken")
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dashboardData, setDashboardData] = useState<UserDashboardResponse | null>(null);
  const [userTier, setUserTier] = useState<AgentTierDto | null>(null);
  const [userSubscription, setUserSubscription] = useState<UserSubscriptionDto | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("authUser");
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
      const user: UserDetails = {
        id: response.userId,
        username: response.username,
        email: response.username,
        role: response.role,
      };
      setUser(user);
      setToken(response.jwtToken);
      localStorage.setItem("authToken", response.jwtToken);
      localStorage.setItem("authUser", JSON.stringify(user));
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

  const refreshUser = async () => {
    // Placeholder for dashboard data refresh
    try {
      setIsLoading(true);
      // const dashboardResponse = await userService.getUserDashboard();
      // setDashboardData(dashboardResponse);
      // setUserTier(dashboardResponse.tier);
      // setUserSubscription(dashboardResponse.subscription);
    } catch (error) {
      console.error("Failed to refresh user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setDashboardData(null);
    setUserTier(null);
    setUserSubscription(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        userType: user?.userType || null,
        login,
        logout,
        register,
        dashboardData,
        userTier,
        userSubscription,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

