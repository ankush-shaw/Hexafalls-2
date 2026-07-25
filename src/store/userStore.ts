import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { User, UserSettings } from '../types/user.types';
import { LOCAL_STORAGE_KEYS } from '../constants/app.constants';

interface UserState {
  user: User | null;
  settings: UserSettings;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface UserActions {
  setUser: (user: User | null) => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}

type UserStore = UserState & UserActions;

const defaultSettings: UserSettings = {
  theme: 'dark',
  sidebarCollapsed: false,
  notificationsEnabled: true,
  soundEnabled: true,
  voiceInputLanguage: 'en-US',
  autoRefreshInterval: 30,
  debugMode: false,
};

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        settings: defaultSettings,
        isAuthenticated: false,
        isLoading: false,
        error: null,

        setUser: (user) => set({ user, isAuthenticated: !!user }),
        updateSettings: (newSettings) =>
          set((state) => ({ settings: { ...state.settings, ...newSettings } })),
        setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
        setLoading: (isLoading) => set({ isLoading }),
        setError: (error) => set({ error }),
        logout: () => set({ user: null, isAuthenticated: false, error: null }),
      }),
      {
        name: LOCAL_STORAGE_KEYS.USER_SETTINGS,
        partialize: (state) => ({ settings: state.settings, isAuthenticated: state.isAuthenticated, user: state.user }),
      }
    ),
    { name: 'UserStore' }
  )
);
