import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  AnalyticsOverviewMetrics,
  AgentAnalyticsMetrics,
  ResourceMetrics,
  PlatformNotification,
  AuditLogItem,
  TeamMember,
  PlatformSettings,
} from '../types/analytics.types';

interface AnalyticsState {
  overview: AnalyticsOverviewMetrics;
  agentAnalytics: AgentAnalyticsMetrics;
  resources: ResourceMetrics;
  notifications: PlatformNotification[];
  auditLogs: AuditLogItem[];
  teamMembers: TeamMember[];
  settings: PlatformSettings;
  searchQuery: string;
  selectedCategory: string;
}

interface AnalyticsActions {
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: string) => void;
  markNotificationRead: (id: string) => void;
  archiveNotification: (id: string) => void;
  clearAllNotifications: () => void;
  updateSettings: (newSettings: Partial<PlatformSettings>) => void;
  tickTelemetry: () => void;
  loadDemoAnalyticsState: () => void;
}

type AnalyticsStore = AnalyticsState & AnalyticsActions;

const DEMO_OVERVIEW: AnalyticsOverviewMetrics = {
  totalWorkflows: 142,
  completedToday: 18,
  activeWorkflows: 3,
  failedWorkflows: 1,
  runningAgents: 8,
  avgCompletionTime: '02:35',
  avgConfidence: 97.2,
  avgSuccessRate: 99.1,
  systemLoad: 42,
};

const DEMO_AGENT_ANALYTICS: AgentAnalyticsMetrics = {
  bossPlanningDuration: '00:24',
  bossDecisionAccuracy: 98.6,
  bossApprovalRate: 96.4,
  supervisorQueueSize: 2,
  supervisorTaskSpeed: '1.2s/task',
  supervisorRetryCount: 0,
  workerUtilization: 68,
  workerAvgDuration: '00:45',
  workerTotalCompleted: 512,
  workerTotalFailed: 4,
};

const DEMO_RESOURCES: ResourceMetrics = {
  cpuUsage: 38,
  memoryUsage: '4.2 GB',
  memoryPercent: 52,
  storageUsage: '128 GB',
  bandwidth: '45.2 MB/s',
  socketConnections: 24,
  apiRequestsTotal: 184500,
  apiResponseTimeMs: 14,
  activeUsers: 12,
};

const DEMO_NOTIFICATIONS: PlatformNotification[] = [
  { id: 'not-1', category: 'Boss', title: 'Strategy Plan Approved', message: 'Boss Agent CEO approved Q4 Enterprise Performance Audit blueprint.', timestamp: '10:43:10 AM', priority: 'high', read: false, archived: false },
  { id: 'not-2', category: 'Supervisor', title: 'Worker Thread Pool Scaled', message: 'Supervisor COO allocated 8 concurrent execution threads.', timestamp: '10:41:05 AM', priority: 'medium', read: false, archived: false },
  { id: 'not-3', category: 'Workers', title: 'Data Scraper Task Finished', message: 'Worker DS-Alpha returned 14 competitor pricing packages CSV.', timestamp: '10:42:30 AM', priority: 'low', read: true, archived: false },
  { id: 'not-4', category: 'Security', title: 'GDPR Compliance Check Passed', message: 'Legal compliance assertion verified anonymized data exports.', timestamp: '10:42:40 AM', priority: 'medium', read: true, archived: false },
];

const DEMO_AUDIT_LOGS: AuditLogItem[] = [
  { id: 'log-101', timestamp: '10:43:25 AM', actor: 'Gemini AI', actorRole: 'Report Generator', category: 'System', action: 'Generate Report', details: 'Executive PDF Deliverable generated for workflow wf-q4-audit-8821.', status: 'success' },
  { id: 'log-102', timestamp: '10:43:10 AM', actor: 'Boss Agent CEO', actorRole: 'CEO AI', category: 'Boss', action: 'Approve Workflow', details: 'Boss Agent validated departmental outputs with 97.5% confidence.', status: 'success' },
  { id: 'log-103', timestamp: '10:41:00 AM', actor: 'Supervisor COO', actorRole: 'COO AI', category: 'Supervisor', action: 'Spawn Workers', details: 'Allocated 5 worker nodes in dynamic thread pool.', status: 'success' },
  { id: 'log-104', timestamp: '10:40:00 AM', actor: 'Admin User', actorRole: 'Admin', category: 'User', action: 'Submit Prompt', details: 'Initiated Q4 Strategic Enterprise Audit prompt.', status: 'success' },
];

const DEMO_TEAM: TeamMember[] = [
  { id: 'usr-1', name: 'Alex Mercer', email: 'alex.mercer@enterprise.ai', role: 'Admin', avatar: 'from-amber-500 to-amber-600', status: 'active', lastActive: 'Now' },
  { id: 'usr-2', name: 'Dr. Sarah Chen', email: 'sarah.chen@enterprise.ai', role: 'Manager', avatar: 'from-sky-500 to-blue-600', status: 'active', lastActive: '5m ago' },
  { id: 'usr-3', name: 'Marcus Vance', email: 'marcus.vance@enterprise.ai', role: 'Operator', avatar: 'from-purple-500 to-indigo-600', status: 'active', lastActive: '1h ago' },
];

const DEMO_SETTINGS: PlatformSettings = {
  general: {
    language: 'English (US)',
    theme: 'dark',
    timezone: 'UTC -05:00 (EST)',
  },
  aiConfig: {
    model: 'Gemini 2.5 Flash / Pro Hybrid',
    temperature: 0.2,
    maxTokens: 8192,
    autoApproveConfidence: 95,
    enableVoice: true,
  },
  notifications: {
    emailAlerts: true,
    slackAlerts: true,
    criticalOnly: false,
  },
};

export const useAnalyticsStore = create<AnalyticsStore>()(
  devtools(
    persist(
      (set, get) => ({
        overview: DEMO_OVERVIEW,
        agentAnalytics: DEMO_AGENT_ANALYTICS,
        resources: DEMO_RESOURCES,
        notifications: DEMO_NOTIFICATIONS,
        auditLogs: DEMO_AUDIT_LOGS,
        teamMembers: DEMO_TEAM,
        settings: DEMO_SETTINGS,
        searchQuery: '',
        selectedCategory: 'All',

        setSearchQuery: (query) => set({ searchQuery: query }),
        setSelectedCategory: (cat) => set({ selectedCategory: cat }),

        markNotificationRead: (id) => {
          const { notifications } = get();
          set({
            notifications: notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
          });
        },

        archiveNotification: (id) => {
          const { notifications } = get();
          set({
            notifications: notifications.map((n) => (n.id === id ? { ...n, archived: true } : n)),
          });
        },

        clearAllNotifications: () => set({ notifications: [] }),

        updateSettings: (newSettings) => {
          const { settings } = get();
          set({
            settings: { ...settings, ...newSettings },
          });
        },

        tickTelemetry: () => {
          const { resources } = get();
          const cpuVariation = Math.min(95, Math.max(15, resources.cpuUsage + (Math.random() > 0.5 ? 2 : -2)));
          set({
            resources: {
              ...resources,
              cpuUsage: cpuVariation,
            },
          });
        },

        loadDemoAnalyticsState: () => {
          set({
            overview: DEMO_OVERVIEW,
            agentAnalytics: DEMO_AGENT_ANALYTICS,
            resources: DEMO_RESOURCES,
            notifications: DEMO_NOTIFICATIONS,
            auditLogs: DEMO_AUDIT_LOGS,
            teamMembers: DEMO_TEAM,
            settings: DEMO_SETTINGS,
          });
        },
      }),
      {
        name: 'aegisos-analytics-store',
        partialize: (state) => ({
          settings: state.settings,
        }),
      }
    ),
    { name: 'AnalyticsStore' }
  )
);
