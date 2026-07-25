import { apiClient } from './client';
import { ApiResponse } from '../../types/api.types';
import {
  AnalyticsOverviewMetrics,
  AgentAnalyticsMetrics,
  ResourceMetrics,
  PlatformNotification,
  AuditLogItem,
  PlatformSettings,
} from '../../types/analytics.types';


export const analyticsService = {
  /**
   * Fetch system-wide analytics overview
   */
  async getAnalytics(): Promise<ApiResponse<{ overview: AnalyticsOverviewMetrics; agents: AgentAnalyticsMetrics }>> {
    return apiClient.get<{ overview: AnalyticsOverviewMetrics; agents: AgentAnalyticsMetrics }, ApiResponse<{ overview: AnalyticsOverviewMetrics; agents: AgentAnalyticsMetrics }>>('/analytics');
  },

  /**
   * Fetch system health & hardware resource telemetry
   */
  async getSystemTelemetry(): Promise<ApiResponse<ResourceMetrics>> {
    return apiClient.get<ResourceMetrics, ApiResponse<ResourceMetrics>>('/system');
  },

  /**
   * Fetch notification feed
   */
  async getNotifications(): Promise<ApiResponse<PlatformNotification[]>> {
    return apiClient.get<PlatformNotification[], ApiResponse<PlatformNotification[]>>('/notifications');
  },

  /**
   * Mark notification as read
   */
  async markNotificationRead(id: string): Promise<ApiResponse<{ success: boolean }>> {
    return apiClient.post<{ success: boolean }, ApiResponse<{ success: boolean }>>('/notifications/read', { id });
  },

  /**
   * Fetch audit logs
   */
  async getAuditLogs(): Promise<ApiResponse<AuditLogItem[]>> {
    return apiClient.get<AuditLogItem[], ApiResponse<AuditLogItem[]>>('/audit');
  },

  /**
   * Fetch platform settings
   */
  async getSettings(): Promise<ApiResponse<PlatformSettings>> {
    return apiClient.get<PlatformSettings, ApiResponse<PlatformSettings>>('/settings');
  },

  /**
   * Update platform settings
   */
  async updateSettings(settings: Partial<PlatformSettings>): Promise<ApiResponse<{ updated: boolean }>> {
    return apiClient.post<{ updated: boolean }, ApiResponse<{ updated: boolean }>>('/settings', settings);
  },
};

export default analyticsService;
