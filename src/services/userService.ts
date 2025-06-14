import { UserDetails } from "@/types/api";
import apiClient from "./apiClient";

export const getMyDetails = async (): Promise<UserDetails> => {
  const response = await apiClient.get<UserDetails>("/users/me");
  return response.data;
};

export const updateMyDetails = async (
  userData: Partial<UserDetails>
): Promise<UserDetails> => {
  // MOCK IMPLEMENTATION
  const storedUser = localStorage.getItem("authUser");
  if (storedUser) {
    let currentUser = JSON.parse(storedUser);
    currentUser = { ...currentUser, ...userData };
    localStorage.setItem("authUser", JSON.stringify(currentUser));
    return Promise.resolve(currentUser);
  }
  return Promise.reject(new Error("User not found for update"));
  // const response = await apiClient.put<UserDetails>(`/users/me`, userData); // Assuming PUT to /users/me or /users/{id}
  // return response.data;
};
