import apiClient from './apiClient';
import { UserLoginRequest, UserRegistrationRequest, AuthResponse } from '@/types/api';

export const login = async (credentials: UserLoginRequest): Promise<AuthResponse> => {
  // MOCK IMPLEMENTATION
  console.log('Attempting login with:', credentials);
  const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
  return response.data;
};

export const register = async (userData: UserRegistrationRequest): Promise<void> => {
  // MOCK IMPLEMENTATION
  console.log('Attempting registration with:', userData);
  if (userData.email === 'existing@example.com') {
    return Promise.reject(new Error('Email already exists'));
  }
  await apiClient.post('/auth/register', userData);
  return Promise.resolve();
};
