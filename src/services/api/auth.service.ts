import { apiClient } from './client';
import { API_ENDPOINTS } from '../../constants/api.constants';
import { AuthResponse } from '../../types/api.types';

export const authService = {
  login: async (credentials: Record<string, unknown>): Promise<AuthResponse['data']> => {
    const res = await apiClient.post<unknown, AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
    return res.data;
  },

  register: async (userData: Record<string, unknown>): Promise<AuthResponse['data']> => {
    const res = await apiClient.post<unknown, AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, userData);
    return res.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  },

  getMe: async (): Promise<AuthResponse['data']['user']> => {
    const res = await apiClient.get<unknown, { success: boolean; data: AuthResponse['data']['user'] }>(
      API_ENDPOINTS.AUTH.ME
    );
    return res.data;
  },
};
