export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: 'admin' | 'developer' | 'operator' | 'viewer';
  createdAt: string;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  sidebarCollapsed: boolean;
  notificationsEnabled: boolean;
  soundEnabled: boolean;
  voiceInputLanguage: string;
  autoRefreshInterval: number; // in seconds
  debugMode: boolean;
}
