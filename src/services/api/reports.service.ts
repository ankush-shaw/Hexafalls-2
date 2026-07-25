import { apiClient } from './client';
import { API_ENDPOINTS } from '../../constants/api.constants';
import { ReportItem } from '../../store/reportsStore';
import { ApiResponse } from '../../types/api.types';

export const reportsService = {
  getReports: async (): Promise<ReportItem[]> => {
    const res = await apiClient.get<unknown, ApiResponse<ReportItem[]>>(API_ENDPOINTS.REPORTS.BASE);
    return res.data;
  },

  createReport: async (config: { name: string; type: ReportItem['type']; workflowId?: string }): Promise<ReportItem> => {
    const res = await apiClient.post<unknown, ApiResponse<ReportItem>>(API_ENDPOINTS.REPORTS.BASE, config);
    return res.data;
  },

  deleteReport: async (id: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.REPORTS.BY_ID(id));
  },

  exportReport: async (id: string, format: 'pdf' | 'csv' | 'json'): Promise<Blob> => {
    const res = await apiClient.get<unknown, Blob>(API_ENDPOINTS.REPORTS.EXPORT(id), {
      params: { format },
      responseType: 'blob',
    });
    return res;
  },
};
