import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL, API_TIMEOUT } from '../../constants/api.constants';
import { LOCAL_STORAGE_KEYS } from '../../constants/app.constants';
import { useUserStore } from '../../store/userStore';
import { useSettingsStore } from '../../store/settingsStore';

export class ApiError extends Error {
  status?: number;
  code?: string;
  details?: unknown;

  constructor(message: string, status?: number, code?: string, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

// Create custom axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let failedQueue: Array<{ resolve: (token: string) => void; reject: (err: any) => void }> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request Interceptor: Attach access token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Check network status before sending
    if (typeof window !== 'undefined' && !navigator.onLine) {
      useSettingsStore.getState().setOnlineStatus(false);
      return Promise.reject(new ApiError('You are currently offline. Please check your network connection.', 0, 'OFFLINE'));
    }

    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle errors and token refresh
apiClient.interceptors.response.use(
  (response) => {
    // Make sure online status is correct
    useSettingsStore.getState().setOnlineStatus(true);
    return response.data;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (!originalRequest) return Promise.reject(error);

    // Network error
    if (!error.response) {
      if (typeof window !== 'undefined' && !navigator.onLine) {
        useSettingsStore.getState().setOnlineStatus(false);
      }
      return Promise.reject(
        new ApiError('Network connection error. Server may be down.', 503, 'NETWORK_ERROR')
      );
    }

    const status = error.response.status;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errorData = error.response.data as any;
    const errorCode = errorData?.error?.code || 'UNKNOWN_ERROR';
    const errorMessage = errorData?.error?.message || errorData?.message || error.message;

    // Handle token refresh on 401 Unauthorized
    // Make sure we are not already trying to refresh and we have a refresh token
    const refreshToken = localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (status === 401 && !(originalRequest as any)._retry && refreshToken) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (originalRequest as any)._retry = true;
      isRefreshing = true;

      try {
        // Attempt token refresh
        const refreshResponse = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        const { accessToken, newRefreshToken } = refreshResponse.data.data;
        localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, accessToken);
        if (newRefreshToken) {
          localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);
        }

        processQueue(null, accessToken);
        isRefreshing = false;

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed, logout user
        processQueue(refreshError as Error, null);
        isRefreshing = false;
        
        localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
        useUserStore.getState().logout();
        
        return Promise.reject(
          new ApiError('Session expired. Please log in again.', 401, 'SESSION_EXPIRED')
        );
      }
    }

    // Generic API Error transformation
    return Promise.reject(
      new ApiError(errorMessage, status, errorCode, errorData?.error?.details)
    );
  }
);
