import apiClient from './apiClient';
import { UserDetails } from '@/types/api';

export const getMyDetails = async (): Promise<UserDetails> => {
  // MOCK IMPLEMENTATION
  const storedUser = localStorage.getItem('authUser');
  if (storedUser) {
    return Promise.resolve(JSON.parse(storedUser));
  }
  // Simulate fetching if not in local storage (e.g. after refresh)
  const mockUser: UserDetails = { id: '1', username: 'Mock User', email: 'mock@example.com', role: 'lister' };
  return Promise.resolve(mockUser);
  // const response = await apiClient.get<UserDetails>('/users/me');
  // return response.data;
};

export const updateMyDetails = async (userData: Partial<UserDetails>): Promise<UserDetails> => {
  // MOCK IMPLEMENTATION
  const storedUser = localStorage.getItem('authUser');
  if (storedUser) {
    let currentUser = JSON.parse(storedUser);
    currentUser = { ...currentUser, ...userData };
    localStorage.setItem('authUser', JSON.stringify(currentUser));
    return Promise.resolve(currentUser);
  }
  return Promise.reject(new Error('User not found for update'));
  // const response = await apiClient.put<UserDetails>(`/users/me`, userData); // Assuming PUT to /users/me or /users/{id}
  // return response.data;
};
