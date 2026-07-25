import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface PlatformConfig {
  maxConcurrentTasks: number;
  enableTelemetry: boolean;
  agentResponseTimeoutMs: number;
  logRetentionDays: number;
  allowedModels: string[];
}

interface SettingsState {
  config: PlatformConfig;
  isOnline: boolean;
  isSidebarCollapsed: boolean;
}

interface SettingsActions {
  updateConfig: (config: Partial<PlatformConfig>) => void;
  setOnlineStatus: (isOnline: boolean) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (isCollapsed: boolean) => void;
}

type SettingsStore = SettingsState & SettingsActions;

const initialConfig: PlatformConfig = {
  maxConcurrentTasks: 10,
  enableTelemetry: true,
  agentResponseTimeoutMs: 30000,
  logRetentionDays: 7,
  allowedModels: ['gemini-2.5-flash', 'gemini-2.5-pro', 'claude-3-5-sonnet', 'gpt-4o'],
};

export const useSettingsStore = create<SettingsStore>()(
  devtools(
    persist(
      (set) => ({
        config: initialConfig,
        isOnline: true,
        isSidebarCollapsed: false,

        updateConfig: (newConfig) =>
          set((state) => ({ config: { ...state.config, ...newConfig } })),
        setOnlineStatus: (isOnline) => set({ isOnline }),
        toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
        setSidebarCollapsed: (isSidebarCollapsed) => set({ isSidebarCollapsed }),
      }),
      {
        name: 'aegisos-platform-settings',
        partialize: (state) => ({ config: state.config, isSidebarCollapsed: state.isSidebarCollapsed }),
      }
    ),
    { name: 'SettingsStore' }
  )
);
