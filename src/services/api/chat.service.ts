import { apiClient } from './client';
import { ApiResponse } from '../../types/api.types';
import { ChatMessage, Conversation, Attachment } from '../../types/chat.types';

export interface SendMessagePayload {
  conversationId: string;
  content: string;
  attachments?: string[]; // Attachment IDs
}

export interface TranscribePayload {
  audioBlob: Blob;
  language?: string;
}

export const chatService = {
  /**
   * Send a message to the AI pipeline
   */
  async sendMessage(payload: SendMessagePayload): Promise<ApiResponse<ChatMessage>> {
    // API endpoint stub — backend handled in Phase 4
    return apiClient.post<ChatMessage, ApiResponse<ChatMessage>>('/chat', payload);
  },

  /**
   * Upload audio recording for server-side Speech-To-Text fallback
   */
  async transcribeAudio(payload: TranscribePayload): Promise<ApiResponse<{ transcript: string; confidence: number }>> {
    const formData = new FormData();
    formData.append('audio', payload.audioBlob, 'recording.wav');
    if (payload.language) formData.append('language', payload.language);

    return apiClient.post('/voice/transcribe', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  /**
   * Upload attachment file
   */
  async uploadFile(file: File, onProgress?: (progress: number) => void): Promise<ApiResponse<Attachment>> {
    const formData = new FormData();
    formData.append('file', file);

    return apiClient.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (evt) => {
        if (evt.total && onProgress) {
          onProgress(Math.round((evt.loaded * 100) / evt.total));
        }
      },
    });
  },

  /**
   * Fetch messages for a conversation
   */
  async getConversationMessages(conversationId: string): Promise<ApiResponse<ChatMessage[]>> {
    return apiClient.get<ChatMessage[], ApiResponse<ChatMessage[]>>(`/conversation/${conversationId}`);
  },

  /**
   * Fetch conversation history list
   */
  async getHistory(): Promise<ApiResponse<Conversation[]>> {
    return apiClient.get<Conversation[], ApiResponse<Conversation[]>>('/history');
  },
};

export default chatService;
