export type EventSource = 'boss' | 'supervisor' | 'worker' | 'workflow' | 'system' | 'frontend';
export type EventTarget = 'boss' | 'supervisor' | 'worker' | 'workflow' | 'frontend' | 'all';

export interface SystemEventPayload<T = Record<string, unknown>> {
  eventId: string;
  eventName: string;
  source: EventSource;
  target: EventTarget;
  timestamp: Date;
  workflowId?: string;
  executionId?: string;
  priority: number; // 1-10
  payload: T;
  metadata?: Record<string, unknown>;
  version: string;
}

export interface PresenceInfo {
  agentId: string;
  type: 'boss' | 'supervisor' | 'worker' | 'user';
  status: 'online' | 'busy' | 'idle' | 'offline';
  lastHeartbeat: Date;
  metadata?: Record<string, unknown>;
}

export interface NotificationPayload {
  notificationId: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  workflowId?: string;
  read: boolean;
  timestamp: Date;
}
