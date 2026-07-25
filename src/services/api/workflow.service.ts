import { apiClient } from './client';
import { API_ENDPOINTS } from '../../constants/api.constants';
import { Workflow, WorkflowExecution } from '../../types/workflow.types';
import { ApiResponse } from '../../types/api.types';

export const workflowService = {
  getWorkflows: async (): Promise<Workflow[]> => {
    const res = await apiClient.get<unknown, ApiResponse<Workflow[]>>(API_ENDPOINTS.WORKFLOWS.BASE);
    return res.data;
  },

  getWorkflowById: async (id: string): Promise<Workflow> => {
    const res = await apiClient.get<unknown, ApiResponse<Workflow>>(API_ENDPOINTS.WORKFLOWS.BY_ID(id));
    return res.data;
  },

  createWorkflow: async (workflow: Omit<Workflow, 'id' | 'createdAt' | 'updatedAt'>): Promise<Workflow> => {
    const res = await apiClient.post<unknown, ApiResponse<Workflow>>(API_ENDPOINTS.WORKFLOWS.BASE, workflow);
    return res.data;
  },

  updateWorkflow: async (id: string, workflow: Partial<Workflow>): Promise<Workflow> => {
    const res = await apiClient.put<unknown, ApiResponse<Workflow>>(API_ENDPOINTS.WORKFLOWS.BY_ID(id), workflow);
    return res.data;
  },

  deleteWorkflow: async (id: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.WORKFLOWS.BY_ID(id));
  },

  executeWorkflow: async (id: string, inputs?: Record<string, unknown>): Promise<WorkflowExecution> => {
    const res = await apiClient.post<unknown, ApiResponse<WorkflowExecution>>(
      API_ENDPOINTS.WORKFLOWS.EXECUTE(id),
      { inputs }
    );
    return res.data;
  },
};
