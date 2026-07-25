import { apiClient } from './client';
import { ApiResponse } from '../../types/api.types';
import {
  SupervisorSession,
  SupervisorTask,
  SupervisorWorker,
  SupervisorMetrics,
} from '../../types/supervisor.types';

export interface RetryTaskPayload {
  sessionId: string;
  taskId: string;
}

export interface AssignTaskPayload {
  sessionId: string;
  taskId: string;
  workerId: string;
}

export const supervisorService = {
  /**
   * Fetch current Supervisor AI orchestration status & stage
   */
  async getStatus(sessionId: string): Promise<ApiResponse<SupervisorSession>> {
    return apiClient.get<SupervisorSession, ApiResponse<SupervisorSession>>(`/supervisor/status?sessionId=${sessionId}`);
  },

  /**
   * Fetch received workflow task decomposition
   */
  async getWorkflow(sessionId: string): Promise<ApiResponse<SupervisorTask[]>> {
    return apiClient.get<SupervisorTask[], ApiResponse<SupervisorTask[]>>(`/supervisor/workflow?sessionId=${sessionId}`);
  },

  /**
   * Fetch active execution queue items
   */
  async getQueue(sessionId: string): Promise<ApiResponse<{ queue: SupervisorTask[]; metrics: SupervisorMetrics }>> {
    return apiClient.get<{ queue: SupervisorTask[]; metrics: SupervisorMetrics }, ApiResponse<{ queue: SupervisorTask[]; metrics: SupervisorMetrics }>>(`/supervisor/queue?sessionId=${sessionId}`);
  },

  /**
   * Fetch active dynamically allocated worker nodes
   */
  async getWorkers(sessionId: string): Promise<ApiResponse<SupervisorWorker[]>> {
    return apiClient.get<SupervisorWorker[], ApiResponse<SupervisorWorker[]>>(`/supervisor/workers?sessionId=${sessionId}`);
  },

  /**
   * Trigger manual retry on failed task
   */
  async retryTask(payload: RetryTaskPayload): Promise<ApiResponse<{ success: boolean; taskId: string }>> {
    return apiClient.post<{ success: boolean; taskId: string }, ApiResponse<{ success: boolean; taskId: string }>>('/supervisor/retry', payload);
  },

  /**
   * Assign worker node to a specific task
   */
  async assignTask(payload: AssignTaskPayload): Promise<ApiResponse<{ success: boolean }>> {
    return apiClient.post<{ success: boolean }, ApiResponse<{ success: boolean }>>('/supervisor/assign', payload);
  },
};

export default supervisorService;
