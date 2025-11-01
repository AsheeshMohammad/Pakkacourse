import { jwtAxios } from './axios';
import { API_ENDPOINTS } from './endpoints';

export interface LoginData {
  username: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: any;
    token: string;
  };
}

export const authService = {
  login: async (loginData: LoginData): Promise<AuthResponse> => {
    const response = await jwtAxios.post(API_ENDPOINTS.AUTH.LOGIN, loginData);
    if (response.data.success && response.data.data?.token) {
      localStorage.setItem('token', response.data.data.token);
    }
    return response.data;
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem('token');
    await jwtAxios.post(API_ENDPOINTS.AUTH.LOGOUT);
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  }
};