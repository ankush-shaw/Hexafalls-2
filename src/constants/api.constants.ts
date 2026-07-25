export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },
  AGENTS: {
    BASE: '/agents',
    BY_ID: (id: string) => `/agents/${id}`,
    METRICS: (id: string) => `/agents/${id}/metrics`,
    MESSAGES: (id: string) => `/agents/${id}/messages`,
  },
  WORKFLOWS: {
    BASE: '/workflows',
    BY_ID: (id: string) => `/workflows/${id}`,
    EXECUTE: (id: string) => `/workflows/${id}/execute`,
    EXECUTIONS: (id: string) => `/workflows/${id}/executions`,
  },
  REPORTS: {
    BASE: '/reports',
    BY_ID: (id: string) => `/reports/${id}`,
    EXPORT: (id: string) => `/reports/${id}/export`,
  },
  ANALYTICS: {
    SUMMARY: '/analytics/summary',
    SYSTEM_LOAD: '/analytics/system-load',
  },
} as const;

export const API_TIMEOUT = 30000; // 30 seconds
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
export const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000';
