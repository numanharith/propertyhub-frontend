/**
 * Service functions for Ecosystem (Service Partner, Referral) API calls.
 */
import api from './api';
import { ServicePartner, ReferralTransaction } from '../types/api';

/**
 * Retrieves all active service partners.
 * @returns A promise resolving with a list of active service partners.
 */
export const getAllActiveServicePartners = async (): Promise<ServicePartner[]> => {
    const response = await api.get<ServicePartner[]>('/service-partners');
    return response.data;
};

/**
 * Initiates a referral transaction to a service partner.
 * Requires the authenticated user.
 * @param partnerId - The ID of the service partner.
 * @param referredUserId - The ID of the user being referred.
 * @returns A promise resolving with the created referral transaction.
 */
export const initiateReferral = async (partnerId: number, referredUserId: number): Promise<ReferralTransaction> => {
// Backend gets referringUserId from auth context
    const response = await api.post<ReferralTransaction>(`/service-partners/${partnerId}/refer`, { referredUserId });
    return response.data;
};

// Add methods to get user's referral history if the backend endpoint is implemented:
// getMyReferrals: async (): Promise<ReferralTransactionDto[]> => { ... }
