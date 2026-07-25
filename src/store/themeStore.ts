import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { LOCAL_STORAGE_KEYS } from '../constants/app.constants';

type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: Theme;
}

interface ThemeActions {
  setTheme: (theme: Theme) => void;
}

type ThemeStore = ThemeState & ThemeActions;

export const useThemeStore = create<ThemeStore>()(
  devtools(
    persist(
      (set) => ({
        theme: 'dark',
        setTheme: (theme) => set({ theme }),
      }),
      {
        name: LOCAL_STORAGE_KEYS.THEME,
      }
    ),
    { name: 'ThemeStore' }
  )
);
