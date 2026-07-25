export type MessageRole = 'user' | 'assistant' | 'system' | 'agent';
export type MessageStatus = 'sending' | 'queued' | 'sent' | 'failed' | 'delivered';

export type AttachmentType = 'image' | 'pdf' | 'doc' | 'excel' | 'csv' | 'json' | 'audio' | 'video';

export interface Attachment {
  id: string;
  name: string;
  size: number;
  type: AttachmentType;
  mimeType: string;
  url?: string;
  file?: File;
  uploadProgress?: number;
  status: 'uploading' | 'complete' | 'error';
  error?: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  role: MessageRole;
  content: string;
  senderName?: string;
  senderAvatar?: string;
  agentRole?: 'boss' | 'supervisor' | 'worker';
  timestamp: string;
  status: MessageStatus;
  attachments?: Attachment[];
  reactions?: Record<string, number>; // emoji -> count
  editedAt?: string;
  isError?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  pinned?: boolean;
  archived?: boolean;
  lastMessageSnippet?: string;
  messageCount: number;
  tags?: string[];
}

export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  category: 'business' | 'reports' | 'workflow' | 'creative' | 'support';
  prompt: string;
  icon: string;
  shortcut?: string;
  isFavorite?: boolean;
}

export interface ChatDraft {
  conversationId: string;
  content: string;
  attachments: Attachment[];
  updatedAt: string;
}

export interface VoiceRecordingState {
  isRecording: boolean;
  isPaused: boolean;
  durationSeconds: number;
  audioBlob: Blob | null;
  audioUrl: string | null;
  transcript: string;
  confidence: number;
  permissionState: 'prompt' | 'granted' | 'denied';
  noiseLevel: number;
}
