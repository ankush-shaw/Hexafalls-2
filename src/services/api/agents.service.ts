import { apiClient } from './client';
import { API_ENDPOINTS } from '../../constants/api.constants';
import { BossAgent, SupervisorAgent, WorkerAgent, AgentMessage } from '../../types/agent.types';
import { ApiResponse, PaginatedResponse } from '../../types/api.types';

export const agentsService = {
  getBossAgent: async (): Promise<BossAgent> => {
    const res = await apiClient.get<unknown, ApiResponse<BossAgent>>(
      API_ENDPOINTS.AGENTS.BASE,
      { params: { role: 'boss' } }
    );
    return res.data;
  },

  getSupervisors: async (): Promise<SupervisorAgent[]> => {
    const res = await apiClient.get<unknown, ApiResponse<SupervisorAgent[]>>(
      API_ENDPOINTS.AGENTS.BASE,
      { params: { role: 'supervisor' } }
    );
    return res.data;
  },

  getWorkers: async (): Promise<WorkerAgent[]> => {
    const res = await apiClient.get<unknown, ApiResponse<WorkerAgent[]>>(
      API_ENDPOINTS.AGENTS.BASE,
      { params: { role: 'worker' } }
    );
    return res.data;
  },

  getAgentById: async (id: string): Promise<BossAgent | SupervisorAgent | WorkerAgent> => {
    const res = await apiClient.get<unknown, ApiResponse<BossAgent | SupervisorAgent | WorkerAgent>>(
      API_ENDPOINTS.AGENTS.BY_ID(id)
    );
    return res.data;
  },

  startAgent: async (id: string): Promise<void> => {
    await apiClient.post(`${API_ENDPOINTS.AGENTS.BY_ID(id)}/start`);
  },

  stopAgent: async (id: string): Promise<void> => {
    await apiClient.post(`${API_ENDPOINTS.AGENTS.BY_ID(id)}/stop`);
  },

  getAgentMessages: async (id: string, page = 1, limit = 50): Promise<PaginatedResponse<AgentMessage>['pagination'] & { messages: AgentMessage[] }> => {
    const res = await apiClient.get<unknown, PaginatedResponse<AgentMessage>>(
      API_ENDPOINTS.AGENTS.MESSAGES(id),
      { params: { page, limit } }
    );
    return {
      messages: res.data,
      ...res.pagination,
    };
  },
};
