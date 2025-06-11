// src/services/billingService.ts
/**
 * Service functions for Billing-related API calls.
 */
import api from './api';
import { CheckoutRequest, CheckoutResponse } from '../types/api';

/**
 * Initiates a checkout session for a payment item (FSBO fee, subscription, etc.).
 * @param data - The checkout request data.
 * @returns A promise resolving with the checkout response, including the payment URL.
 */
export const initiateCheckout = async (data: Omit<CheckoutRequest, 'userId'>): Promise<CheckoutResponse> => {
    // Backend will add userId from authentication context.
    const response = await api.post<CheckoutResponse>('/billing/checkout', data);
    return response.data;
};

// Frontend doesn't directly handle webhooks; this is a backend concern.
// Add methods to get payment history if the backend endpoint is implemented and needed:
// getUserPaymentHistory: async (): Promise<PaymentDto[]> => { ... }
