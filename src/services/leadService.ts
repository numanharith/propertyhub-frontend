import apiClient from './apiClient';
import { SubmitLeadRequest, LeadResponse, UpdateLeadStatusRequest } from '@/types/api';

export const submitLeadForListing = async (
  listingId: number, 
  data: SubmitLeadRequest
): Promise<LeadResponse> => {
  const response = await apiClient.post<LeadResponse>(`/listings/${listingId}/lead`, data);
  return response.data;
};

export const getMyLeads = async (): Promise<LeadResponse[]> => {
  const response = await apiClient.get<LeadResponse[]>('/users/me/leads');
  return response.data;
};

export const updateLeadStatus = async (
  leadId: number, 
  data: UpdateLeadStatusRequest
): Promise<LeadResponse> => {
  const response = await apiClient.patch<LeadResponse>(`/leads/${leadId}`, data);
  return response.data;
};

export const verifyLead = async (
  leadId: number, 
  details: string
): Promise<LeadResponse> => {
  const response = await apiClient.patch<LeadResponse>(`/leads/${leadId}/verify`, { 
    verificationDetails: details 
  });
  return response.data;
};

export const assignLead = async (
  leadId: number, 
  agentId: number
): Promise<LeadResponse> => {
  const response = await apiClient.patch<LeadResponse>(`/leads/${leadId}/assign`, { 
    agentId 
  });
  return response.data;
};