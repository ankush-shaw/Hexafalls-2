import { apiClient } from './client';
import { ApiResponse } from '../../types/api.types';
import {
  WorkerAgent,
  WorkerExecutionLog,
} from '../../types/worker.types';


export interface RetryWorkerPayload {
  workerId: string;
  reason?: string;
}

export const workerService = {
  /**
   * Fetch list of active dynamic Worker Agents
   */
  async getWorkers(): Promise<ApiResponse<WorkerAgent[]>> {
    return apiClient.get<WorkerAgent[], ApiResponse<WorkerAgent[]>>('/workers');
  },

  /**
   * Fetch specific Worker Agent details
   */
  async getWorkerById(workerId: string): Promise<ApiResponse<WorkerAgent>> {
    return apiClient.get<WorkerAgent, ApiResponse<WorkerAgent>>(`/workers/${workerId}`);
  },

  /**
   * Fetch execution logs for a specific worker
   */
  async getWorkerLogs(workerId: string): Promise<ApiResponse<WorkerExecutionLog[]>> {
    return apiClient.get<WorkerExecutionLog[], ApiResponse<WorkerExecutionLog[]>>(`/workers/logs?workerId=${workerId}`);
  },

  /**
   * Trigger worker task retry
   */
  async retryWorker(payload: RetryWorkerPayload): Promise<ApiResponse<{ success: boolean }>> {
    return apiClient.post<{ success: boolean }, ApiResponse<{ success: boolean }>>('/workers/retry', payload);
  },

  /**
   * Cancel worker execution
   */
  async cancelWorker(workerId: string): Promise<ApiResponse<{ success: boolean }>> {
    return apiClient.post<{ success: boolean }, ApiResponse<{ success: boolean }>>('/workers/cancel', { workerId });
  },
};

export default workerService;
