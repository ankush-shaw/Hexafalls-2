import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ChatMessage, Attachment, ChatDraft } from '../types/chat.types';

interface ChatState {
  // conversationId -> list of messages
  messagesByConversation: Record<string, ChatMessage[]>;
  // conversationId -> draft message
  drafts: Record<string, ChatDraft>;
  // conversationId -> current attachments
  attachments: Record<string, Attachment[]>;
  // conversationId -> is AI generating response
  isGenerating: Record<string, boolean>;
  // active typing agents: agentId -> isTyping
  typingAgents: Record<string, boolean>;
}

interface ChatActions {
  getMessages: (conversationId: string) => ChatMessage[];
  addMessage: (conversationId: string, message: ChatMessage) => void;
  updateMessage: (conversationId: string, messageId: string, updates: Partial<ChatMessage>) => void;
  deleteMessage: (conversationId: string, messageId: string) => void;
  setDraft: (conversationId: string, content: string, attachments?: Attachment[]) => void;
  getDraft: (conversationId: string) => ChatDraft | undefined;
  clearDraft: (conversationId: string) => void;
  addAttachment: (conversationId: string, attachment: Attachment) => void;
  removeAttachment: (conversationId: string, attachmentId: string) => void;
  clearAttachments: (conversationId: string) => void;
  setGenerating: (conversationId: string, isGenerating: boolean) => void;
  setTyping: (agentId: string, isTyping: boolean) => void;
}

type ChatStore = ChatState & ChatActions;

const INITIAL_MESSAGES: Record<string, ChatMessage[]> = {
  'conv-1': [
    {
      id: 'msg-1',
      conversationId: 'conv-1',
      role: 'system',
      content: 'AegisOS Multi-Agent Pipeline initialized. Boss Agent is online and awaiting instruction.',
      timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
      status: 'delivered',
    },
    {
      id: 'msg-2',
      conversationId: 'conv-1',
      role: 'user',
      content: 'Conduct a comprehensive market analysis of top AI productivity platforms and extract key growth drivers.',
      timestamp: new Date(Date.now() - 3600000 * 1.9).toISOString(),
      status: 'delivered',
      senderName: 'Hackathon Admin',
    },
    {
      id: 'msg-3',
      conversationId: 'conv-1',
      role: 'assistant',
      senderName: 'Boss Agent',
      agentRole: 'boss',
      content: `I have received your objective. Decomposing market analysis into 3 sub-tasks:

1. **Competitor Benchmarking**: Evaluate feature matrix & pricing tiers.
2. **Growth Driver Analysis**: Identify adoption triggers (API ecosystem, UI speed).
3. **Synthesis & Recommendations**: Draft strategic roadmap.

Delegating Sub-task #1 to **Supervisor Agent Alpha**.`,
      timestamp: new Date(Date.now() - 3600000 * 1.8).toISOString(),
      status: 'delivered',
      reactions: { '👍': 3, '🚀': 2 },
    },
  ],
  'conv-2': [
    {
      id: 'msg-201',
      conversationId: 'conv-2',
      role: 'user',
      content: 'Audit our Q4 financial statement data and generate an executive PDF summary.',
      timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
      status: 'delivered',
    },
    {
      id: 'msg-202',
      conversationId: 'conv-2',
      role: 'assistant',
      senderName: 'Supervisor Beta',
      agentRole: 'supervisor',
      content: 'Audit complete. Total revenue increased by **+14.2% YoY**. EBITDA margins expanded to 28.5%. PDF report attached.',
      timestamp: new Date(Date.now() - 3600000 * 23.5).toISOString(),
      status: 'delivered',
    },
  ],
};

export const useChatStore = create<ChatStore>()(
  devtools(
    persist(
      (set, get) => ({
        messagesByConversation: INITIAL_MESSAGES,
        drafts: {},
        attachments: {},
        isGenerating: {},
        typingAgents: {},

        getMessages: (conversationId) => get().messagesByConversation[conversationId] || [],

        addMessage: (conversationId, message) =>
          set((state) => {
            const current = state.messagesByConversation[conversationId] || [];
            return {
              messagesByConversation: {
                ...state.messagesByConversation,
                [conversationId]: [...current, message],
              },
            };
          }),

        updateMessage: (conversationId, messageId, updates) =>
          set((state) => {
            const current = state.messagesByConversation[conversationId] || [];
            return {
              messagesByConversation: {
                ...state.messagesByConversation,
                [conversationId]: current.map((m) => (m.id === messageId ? { ...m, ...updates } : m)),
              },
            };
          }),

        deleteMessage: (conversationId, messageId) =>
          set((state) => {
            const current = state.messagesByConversation[conversationId] || [];
            return {
              messagesByConversation: {
                ...state.messagesByConversation,
                [conversationId]: current.filter((m) => m.id !== messageId),
              },
            };
          }),

        setDraft: (conversationId, content, attachments = []) =>
          set((state) => ({
            drafts: {
              ...state.drafts,
              [conversationId]: {
                conversationId,
                content,
                attachments,
                updatedAt: new Date().toISOString(),
              },
            },
          })),

        getDraft: (conversationId) => get().drafts[conversationId],

        clearDraft: (conversationId) =>
          set((state) => {
            const nextDrafts = { ...state.drafts };
            delete nextDrafts[conversationId];
            return { drafts: nextDrafts };
          }),

        addAttachment: (conversationId, attachment) =>
          set((state) => {
            const current = state.attachments[conversationId] || [];
            return {
              attachments: {
                ...state.attachments,
                [conversationId]: [...current, attachment],
              },
            };
          }),

        removeAttachment: (conversationId, attachmentId) =>
          set((state) => {
            const current = state.attachments[conversationId] || [];
            return {
              attachments: {
                ...state.attachments,
                [conversationId]: current.filter((a) => a.id !== attachmentId),
              },
            };
          }),

        clearAttachments: (conversationId) =>
          set((state) => {
            const next = { ...state.attachments };
            delete next[conversationId];
            return { attachments: next };
          }),

        setGenerating: (conversationId, isGenerating) =>
          set((state) => ({
            isGenerating: { ...state.isGenerating, [conversationId]: isGenerating },
          })),

        setTyping: (agentId, isTyping) =>
          set((state) => ({
            typingAgents: { ...state.typingAgents, [agentId]: isTyping },
          })),
      }),
      {
        name: 'aegisos-chat',
        partialize: (state) => ({
          messagesByConversation: state.messagesByConversation,
          drafts: state.drafts,
        }),
      }
    ),
    { name: 'ChatStore' }
  )
);
