import { apiClient } from './client';
import { ApiResponse } from '../../types/api.types';
import {
  WorkflowNodeData,
  LiveEventItem,
  SystemHealthItem,
  AgentCommunicationPacket,
} from '../../types/workflow.types';

export const workflowService = {
  /**
   * Fetch active real-time workflow graph nodes and state
   */
  async getWorkflowGraph(): Promise<ApiResponse<{ nodes: WorkflowNodeData[]; health: SystemHealthItem[] }>> {
    return apiClient.get<{ nodes: WorkflowNodeData[]; health: SystemHealthItem[] }, ApiResponse<{ nodes: WorkflowNodeData[]; health: SystemHealthItem[] }>>('/workflow');
  },

  /**
   * Fetch live event log stream
   */
  async getEvents(): Promise<ApiResponse<LiveEventItem[]>> {
    return apiClient.get<LiveEventItem[], ApiResponse<LiveEventItem[]>>('/workflow/events');
  },

  /**
   * Fetch inter-agent communication stream
   */
  async getCommunications(): Promise<ApiResponse<AgentCommunicationPacket[]>> {
    return apiClient.get<AgentCommunicationPacket[], ApiResponse<AgentCommunicationPacket[]>>('/workflow/communications');
  },

  /**
   * Fetch replay step snapshots for completed workflows
   */
  async getReplay(workflowId: string): Promise<ApiResponse<{ steps: Record<string, unknown>[] }>> {
    return apiClient.get<{ steps: Record<string, unknown>[] }, ApiResponse<{ steps: Record<string, unknown>[] }>>(`/workflow/replay?workflowId=${workflowId}`);
  },

};

export default workflowService;
