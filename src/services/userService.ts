import { UserDetails } from "@/types/api";
import apiClient from "./apiClient";
import { AgentTierDto, UserDashboardResponse, UserSubscriptionDto } from '../types/api';

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

/**
 * Retrieves dashboard data for the current authenticated user.
 * @returns A promise resolving with the user dashboard response.
 */
export const getUserDashboard = async (): Promise<UserDashboardResponse> => {
  // Backend gets userId from auth context
  const response = await apiClient.get<UserDashboardResponse>('/users/me/dashboard');
  return response.data;
};

/**
 * Retrieves all available agent tiers.
 * @returns A promise resolving with a list of agent tier DTOs.
 */
export const getAllAgentTiers = async (): Promise<AgentTierDto[]> => {
    const response = await apiClient.get<AgentTierDto[]>('/agent-tiers');
    return response.data;
};

/**
 * Initiates the subscription process for a specific tier for the current user.
 * Note: This typically triggers a payment checkout on the backend.
 * @param tierId - The ID of the agent tier to subscribe to.
 * @returns A promise resolving with the created user subscription DTO (initial state).
 */
export const subscribeToTier = async (tierId: number): Promise<UserSubscriptionDto> => {
  // Backend gets userId from auth context
  const response = await apiClient.post<UserSubscriptionDto>(`/agent-tiers/${tierId}/subscribe`);
  return response.data;
    // Note: The backend 'subscribeToTier' service initiates the Checkout.
    // The frontend should call this, then *expect* to follow a payment URL if provided
    // by the backend response (though the current backend controller returns UserSubscriptionDto).
    // The frontend needs to handle the checkout redirect after calling this.
    // A more common pattern is that the subscribe endpoint *returns* the checkout URL.
    // Let's adjust the expected response based on the backend's BillingService interaction:
    // Backend Service calls BillingService.createSubscriptionCheckoutSession, which returns CheckoutResponse.
    // Backend Controller POST /agent-tiers/{tierId}/subscribe should ideally return CheckoutResponse.
    // Assuming backend is updated to return CheckoutResponse:
  // const response = await api.post<CheckoutResponse>(`/agent-tiers/${tierId}/subscribe`);
  // return response.data; // Return CheckoutResponse
  // Placeholder for original backend return type:
};

// Method to handle redirect after subscription checkout success - not an API call
// This would update frontend state based on URL params or trigger a dashboard refresh.
// handleSubscriptionSuccess: (subscriptionId: number) => { ... }