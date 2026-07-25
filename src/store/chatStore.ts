import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AgentMessage } from '../types/agent.types';

interface ChatState {
  // Stream dictionary: targetId (Agent ID or Room ID) -> list of messages
  streams: Record<string, AgentMessage[]>;
  activeStreamId: string | null;
  typingAgents: Record<string, boolean>; // agentId -> isTyping
}

interface ChatActions {
  setMessages: (streamId: string, messages: AgentMessage[]) => void;
  addMessage: (streamId: string, message: AgentMessage) => void;
  setTyping: (agentId: string, isTyping: boolean) => void;
  setActiveStreamId: (streamId: string | null) => void;
  clearStream: (streamId: string) => void;
}

type ChatStore = ChatState & ChatActions;

export const useChatStore = create<ChatStore>()(
  devtools(
    (set) => ({
      streams: {},
      activeStreamId: null,
      typingAgents: {},

      setMessages: (streamId, messages) =>
        set((state) => ({
          streams: { ...state.streams, [streamId]: messages },
        })),
      addMessage: (streamId, message) =>
        set((state) => {
          const currentMessages = state.streams[streamId] || [];
          return {
            streams: {
              ...state.streams,
              [streamId]: [...currentMessages, message],
            },
          };
        }),
      setTyping: (agentId, isTyping) =>
        set((state) => ({
          typingAgents: { ...state.typingAgents, [agentId]: isTyping },
        })),
      setActiveStreamId: (activeStreamId) => set({ activeStreamId }),
      clearStream: (streamId) =>
        set((state) => {
          const nextStreams = { ...state.streams };
          delete nextStreams[streamId];
          return { streams: nextStreams };
        }),
    }),
    { name: 'ChatStore' }
  )
);
