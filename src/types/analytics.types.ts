export interface AnalyticsOverviewMetrics {
  totalWorkflows: number;
  completedToday: number;
  activeWorkflows: number;
  failedWorkflows: number;
  runningAgents: number;
  avgCompletionTime: string;
  avgConfidence: number;
  avgSuccessRate: number;
  systemLoad: number; // 0 - 100%
}

export interface AgentAnalyticsMetrics {
  bossPlanningDuration: string;
  bossDecisionAccuracy: number;
  bossApprovalRate: number;
  supervisorQueueSize: number;
  supervisorTaskSpeed: string;
  supervisorRetryCount: number;
  workerUtilization: number; // %
  workerAvgDuration: string;
  workerTotalCompleted: number;
  workerTotalFailed: number;
}

export interface ResourceMetrics {
  cpuUsage: number; // %
  memoryUsage: string; // e.g. "4.2 GB"
  memoryPercent: number;
  storageUsage: string; // e.g. "128 GB"
  bandwidth: string; // e.g. "45 MB/s"
  socketConnections: number;
  apiRequestsTotal: number;
  apiResponseTimeMs: number;
  activeUsers: number;
}

export type NotificationCategory =
  | 'Workflow'
  | 'Boss'
  | 'Supervisor'
  | 'Workers'
  | 'System'
  | 'Security'
  | 'Reports'
  | 'Updates';

export interface PlatformNotification {
  id: string;
  category: NotificationCategory;
  title: string;
  message: string;
  timestamp: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  read: boolean;
  archived: boolean;
  actionUrl?: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actor: string;
  actorRole: string;
  category: 'User' | 'Boss' | 'Supervisor' | 'Worker' | 'System' | 'API';
  action: string;
  details: string;
  ipAddress?: string;
  status: 'success' | 'warning' | 'error';
}

export type UserRole = 'Admin' | 'Manager' | 'Operator' | 'Viewer' | 'Guest';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  status: 'active' | 'invited' | 'disabled';
  lastActive: string;
}

export interface PlatformSettings {
  general: {
    language: string;
    theme: 'dark' | 'light' | 'system';
    timezone: string;
  };
  aiConfig: {
    model: string;
    temperature: number;
    maxTokens: number;
    autoApproveConfidence: number;
    enableVoice: boolean;
  };
  notifications: {
    emailAlerts: boolean;
    slackAlerts: boolean;
    criticalOnly: boolean;
  };
}
