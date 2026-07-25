import { apiClient } from './client';
import { ApiResponse } from '../../types/api.types';
import {
  DepartmentReviewItem,
  ExecutiveReport,
  ReportHistoryItem,
} from '../../types/review.types';

export interface ApproveReviewPayload {
  workflowId: string;
  notes?: string;
}

export interface RetryReviewPayload {
  workflowId: string;
  departmentId?: string;
  reason: string;
}

export const reviewService = {
  /**
   * Fetch Boss review queue and departmental deliverables
   */
  async getReviewQueue(): Promise<ApiResponse<{ departments: DepartmentReviewItem[]; workflowId: string }>> {
    return apiClient.get<{ departments: DepartmentReviewItem[]; workflowId: string }, ApiResponse<{ departments: DepartmentReviewItem[]; workflowId: string }>>('/review');
  },

  /**
   * Approve completed workflow tasks
   */
  async approveReview(payload: ApproveReviewPayload): Promise<ApiResponse<{ approved: boolean }>> {
    return apiClient.post<{ approved: boolean }, ApiResponse<{ approved: boolean }>>('/review/approve', payload);
  },

  /**
   * Request retry for a failed/flagged department task
   */
  async requestRetry(payload: RetryReviewPayload): Promise<ApiResponse<{ retryInitiated: boolean }>> {
    return apiClient.post<{ retryInitiated: boolean }, ApiResponse<{ retryInitiated: boolean }>>('/review/retry', payload);
  },

  /**
   * Trigger Gemini Report Generator
   */
  async generateExecutiveReport(workflowId: string): Promise<ApiResponse<ExecutiveReport>> {
    return apiClient.post<ExecutiveReport, ApiResponse<ExecutiveReport>>('/review/report', { workflowId });
  },

  /**
   * Fetch generated Executive Report
   */
  async getReport(reportId: string): Promise<ApiResponse<ExecutiveReport>> {
    return apiClient.get<ExecutiveReport, ApiResponse<ExecutiveReport>>(`/review/report?id=${reportId}`);
  },

  /**
   * Fetch historical executive report list
   */
  async getReportHistory(): Promise<ApiResponse<ReportHistoryItem[]>> {
    return apiClient.get<ReportHistoryItem[], ApiResponse<ReportHistoryItem[]>>('/review/history');
  },
};

export default reviewService;
