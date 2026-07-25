import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface UIState {
  isSidebarCollapsed: boolean;
  isRightPanelOpen: boolean;
  isCommandPaletteOpen: boolean;
  commandPaletteQuery: string;
  breadcrumbs: BreadcrumbItem[];
  recentPages: NavItem[];
  pinnedPages: NavItem[];
  favorites: NavItem[];
  activeSearchQuery: string;
}

interface UIActions {
  setSidebarCollapsed: (v: boolean) => void;
  toggleSidebar: () => void;
  setRightPanelOpen: (v: boolean) => void;
  toggleRightPanel: () => void;
  openCommandPalette: (query?: string) => void;
  closeCommandPalette: () => void;
  setCommandPaletteQuery: (q: string) => void;
  setBreadcrumbs: (crumbs: BreadcrumbItem[]) => void;
  addRecentPage: (page: NavItem) => void;
  pinPage: (page: NavItem) => void;
  unpinPage: (id: string) => void;
  toggleFavorite: (page: NavItem) => void;
  setActiveSearchQuery: (q: string) => void;
}

type UIStore = UIState & UIActions;

export const useUIStore = create<UIStore>()(
  devtools(
    persist(
      (set) => ({
        isSidebarCollapsed: false,
        isRightPanelOpen: true,
        isCommandPaletteOpen: false,
        commandPaletteQuery: '',
        breadcrumbs: [],
        recentPages: [],
        pinnedPages: [],
        favorites: [],
        activeSearchQuery: '',

        setSidebarCollapsed: (v) => set({ isSidebarCollapsed: v }),
        toggleSidebar: () => set((s) => ({ isSidebarCollapsed: !s.isSidebarCollapsed })),
        setRightPanelOpen: (v) => set({ isRightPanelOpen: v }),
        toggleRightPanel: () => set((s) => ({ isRightPanelOpen: !s.isRightPanelOpen })),
        openCommandPalette: (query = '') => set({ isCommandPaletteOpen: true, commandPaletteQuery: query }),
        closeCommandPalette: () => set({ isCommandPaletteOpen: false, commandPaletteQuery: '' }),
        setCommandPaletteQuery: (q) => set({ commandPaletteQuery: q }),
        setBreadcrumbs: (crumbs) => set({ breadcrumbs: crumbs }),
        addRecentPage: (page) =>
          set((s) => {
            const filtered = s.recentPages.filter((p) => p.id !== page.id);
            return { recentPages: [page, ...filtered].slice(0, 10) };
          }),
        pinPage: (page) =>
          set((s) => {
            if (s.pinnedPages.some((p) => p.id === page.id)) return {};
            return { pinnedPages: [...s.pinnedPages, page] };
          }),
        unpinPage: (id) =>
          set((s) => ({ pinnedPages: s.pinnedPages.filter((p) => p.id !== id) })),
        toggleFavorite: (page) =>
          set((s) => {
            const exists = s.favorites.some((p) => p.id === page.id);
            return {
              favorites: exists
                ? s.favorites.filter((p) => p.id !== page.id)
                : [...s.favorites, page],
            };
          }),
        setActiveSearchQuery: (q) => set({ activeSearchQuery: q }),
      }),
      {
        name: 'aegisos-ui',
        partialize: (s) => ({
          isSidebarCollapsed: s.isSidebarCollapsed,
          isRightPanelOpen: s.isRightPanelOpen,
          pinnedPages: s.pinnedPages,
          favorites: s.favorites,
          recentPages: s.recentPages,
        }),
      }
    ),
    { name: 'UIStore' }
  )
);
