import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Conversation } from '../types/chat.types';

interface ConversationState {
  conversations: Conversation[];
  activeConversationId: string | null;
  searchQuery: string;
  filterTag: string | null;
  isSidebarOpen: boolean;
}

interface ConversationActions {
  setActiveConversationId: (id: string | null) => void;
  createConversation: (title?: string) => Conversation;
  updateConversation: (id: string, updates: Partial<Conversation>) => void;
  deleteConversation: (id: string) => void;
  togglePinConversation: (id: string) => void;
  toggleArchiveConversation: (id: string) => void;
  setSearchQuery: (query: string) => void;
  setFilterTag: (tag: string | null) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
}

type ConversationStore = ConversationState & ConversationActions;

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    title: 'Market Analysis & Competitor Breakdown',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    pinned: true,
    messageCount: 8,
    lastMessageSnippet: 'Boss Agent has delegated competitor research to Worker #4.',
    tags: ['research', 'market'],
  },
  {
    id: 'conv-2',
    title: 'Q4 Financial Performance Audit',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    pinned: true,
    messageCount: 14,
    lastMessageSnippet: 'Report PDF generated and saved to workspace.',
    tags: ['finance', 'reports'],
  },
  {
    id: 'conv-3',
    title: 'Multi-Agent Workflow Strategy',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    pinned: false,
    messageCount: 5,
    lastMessageSnippet: 'Workflow execution paused at node #3 awaiting validation.',
    tags: ['workflow', 'boss'],
  },
];

export const useConversationStore = create<ConversationStore>()(
  devtools(
    persist(
      (set) => ({
        conversations: INITIAL_CONVERSATIONS,
        activeConversationId: 'conv-1',
        searchQuery: '',
        filterTag: null,
        isSidebarOpen: true,

        setActiveConversationId: (id) => set({ activeConversationId: id }),

        createConversation: (title = 'New Conversation') => {
          const newConv: Conversation = {
            id: `conv-${Date.now()}`,
            title,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            pinned: false,
            messageCount: 0,
            lastMessageSnippet: 'Conversation started',
          };

          set((state) => ({
            conversations: [newConv, ...state.conversations],
            activeConversationId: newConv.id,
          }));

          return newConv;
        },

        updateConversation: (id, updates) =>
          set((state) => ({
            conversations: state.conversations.map((c) =>
              c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
            ),
          })),

        deleteConversation: (id) =>
          set((state) => {
            const nextList = state.conversations.filter((c) => c.id !== id);
            const nextActive =
              state.activeConversationId === id
                ? nextList.length > 0
                  ? nextList[0].id
                  : null
                : state.activeConversationId;
            return { conversations: nextList, activeConversationId: nextActive };
          }),

        togglePinConversation: (id) =>
          set((state) => ({
            conversations: state.conversations.map((c) =>
              c.id === id ? { ...c, pinned: !c.pinned } : c
            ),
          })),

        toggleArchiveConversation: (id) =>
          set((state) => ({
            conversations: state.conversations.map((c) =>
              c.id === id ? { ...c, archived: !c.archived } : c
            ),
          })),

        setSearchQuery: (searchQuery) => set({ searchQuery }),
        setFilterTag: (filterTag) => set({ filterTag }),
        toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
        setSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
      }),
      {
        name: 'aegisos-conversations',
        partialize: (state) => ({
          conversations: state.conversations,
          activeConversationId: state.activeConversationId,
          isSidebarOpen: state.isSidebarOpen,
        }),
      }
    ),
    { name: 'ConversationStore' }
  )
);
