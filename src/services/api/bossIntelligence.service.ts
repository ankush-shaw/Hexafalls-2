import { apiClient } from './client';
import { ApiResponse } from '../../types/api.types';
import {
  BossPlanningSession,
  ContextEngineData,
  ExecutionStrategy,
} from '../../types/boss.types';


export interface AnalyzeRequestPayload {
  prompt: string;
  conversationId?: string;
}

export const bossIntelligenceService = {
  /**
   * Submit prompt for Boss Agent CEO intent analysis & planning
   */
  async analyzeRequest(payload: AnalyzeRequestPayload): Promise<ApiResponse<BossPlanningSession>> {
    return apiClient.post<BossPlanningSession, ApiResponse<BossPlanningSession>>('/boss/analyze', payload);
  },

  /**
   * Get current Boss Agent planning status & stage
   */
  async getStatus(sessionId: string): Promise<ApiResponse<{ stage: string; progress: number; elapsedSeconds: number }>> {
    return apiClient.get<{ stage: string; progress: number; elapsedSeconds: number }, ApiResponse<{ stage: string; progress: number; elapsedSeconds: number }>>(`/boss/status?sessionId=${sessionId}`);
  },

  /**
   * Fetch context engine data (knowns, unknowns, assumptions)
   */
  async getContext(sessionId: string): Promise<ApiResponse<ContextEngineData>> {
    return apiClient.get<ContextEngineData, ApiResponse<ContextEngineData>>(`/boss/context?sessionId=${sessionId}`);
  },

  /**
   * Fetch AI memory snapshots
   */
  async getMemory(): Promise<ApiResponse<{ rules: string[]; constraints: string[]; benchmarks: string[] }>> {
    return apiClient.get('/boss/memory');
  },

  /**
   * Fetch generated execution strategy proposal
   */
  async getStrategy(sessionId: string): Promise<ApiResponse<ExecutionStrategy>> {
    return apiClient.get<ExecutionStrategy, ApiResponse<ExecutionStrategy>>(`/boss/strategy?sessionId=${sessionId}`);
  },
};

export default bossIntelligenceService;
