import apiClient from './apiClient';
import { UserLoginRequest, UserRegistrationRequest, AuthResponse } from '@/types/api';

export const login = async (credentials: UserLoginRequest): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
  return response.data;
};

export const register = async (userData: UserRegistrationRequest): Promise<void> => {
  await apiClient.post('/auth/register', userData);
  return Promise.resolve();
};
