export const APP_NAME = 'AegisOS';
export const APP_DESCRIPTION = 'Enterprise Multi-Agent AI Operating System';

export const LOCAL_STORAGE_KEYS = {
  THEME: 'aegisos-theme',
  USER_SETTINGS: 'aegisos-settings',
  AUTH_TOKEN: 'aegisos-token',
  REFRESH_TOKEN: 'aegisos-refresh-token',
  SIDEBAR_STATE: 'aegisos-sidebar-collapsed',
} as const;

export const SOCKET_RECONNECT_ATTEMPTS = 5;
export const SOCKET_RECONNECT_DELAY = 1000; // start with 1s (exponential backoff will multiply)
export const SOCKET_TIMEOUT = 20000; // 20s
