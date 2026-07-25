import { apiClient } from './client';
import { ApiResponse } from '../../types/api.types';
import {
  BossDecisionState,
  WorkflowNodePreview,
  ValidationItem,
  ExecutionReadiness,
} from '../../types/boss.types';

export interface ApprovePlanPayload {
  sessionId: string;
  approvedBy: string;
  notes?: string;
}

export const bossDecisionService = {
  /**
   * Approve plan and trigger handoff payload to Supervisor AI
   */
  async approvePlan(payload: ApprovePlanPayload): Promise<ApiResponse<{ success: boolean; handoffId: string }>> {
    return apiClient.post<{ success: boolean; handoffId: string }, ApiResponse<{ success: boolean; handoffId: string }>>('/boss/approve', payload);
  },

  /**
   * Request Boss Agent CEO to replan/regenerate strategy
   */
  async replan(sessionId: string): Promise<ApiResponse<BossDecisionState>> {
    return apiClient.post<BossDecisionState, ApiResponse<BossDecisionState>>('/boss/replan', { sessionId });
  },

  /**
   * Fetch generated DAG workflow node preview
   */
  async getWorkflowPreview(sessionId: string): Promise<ApiResponse<WorkflowNodePreview[]>> {
    return apiClient.get<WorkflowNodePreview[], ApiResponse<WorkflowNodePreview[]>>(`/boss/workflow-preview?sessionId=${sessionId}`);
  },

  /**
   * Fetch validation checklist
   */
  async getValidation(sessionId: string): Promise<ApiResponse<ValidationItem[]>> {
    return apiClient.get<ValidationItem[], ApiResponse<ValidationItem[]>>(`/boss/validation?sessionId=${sessionId}`);
  },

  /**
   * Fetch execution readiness status
   */
  async getReadiness(sessionId: string): Promise<ApiResponse<{ readiness: ExecutionReadiness }>> {
    return apiClient.get<{ readiness: ExecutionReadiness }, ApiResponse<{ readiness: ExecutionReadiness }>>(`/boss/readiness?sessionId=${sessionId}`);
  },
};

export default bossDecisionService;
