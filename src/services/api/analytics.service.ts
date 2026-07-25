import { apiClient } from './client';
import { API_ENDPOINTS } from '../../constants/api.constants';
import { ApiResponse } from '../../types/api.types';

export interface AnalyticsSummary {
  totalTasksCount: number;
  activeAgentsCount: number;
  averageExecutionTimeSeconds: number;
  accuracyRatePercentage: number;
  costSpentUsd: number;
}

export interface SystemLoadMetrics {
  timestamp: string;
  cpu: number;
  memory: number;
  networkInBytes: number;
  networkOutBytes: number;
}

export const analyticsService = {
  getSummary: async (): Promise<AnalyticsSummary> => {
    const res = await apiClient.get<unknown, ApiResponse<AnalyticsSummary>>(
      API_ENDPOINTS.ANALYTICS.SUMMARY
    );
    return res.data;
  },

  getSystemLoad: async (timeRange: '1h' | '24h' | '7d' = '24h'): Promise<SystemLoadMetrics[]> => {
    const res = await apiClient.get<unknown, ApiResponse<SystemLoadMetrics[]>>(
      API_ENDPOINTS.ANALYTICS.SYSTEM_LOAD,
      { params: { range: timeRange } }
    );
    return res.data;
  },
};
