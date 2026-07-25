export type AgentRole = 'boss' | 'supervisor' | 'worker';
export type AgentStatus = 'idle' | 'running' | 'paused' | 'failed' | 'offline';

export interface AgentMetric {
  tasksCompleted: number;
  accuracyRate: number; // percentage (0-100)
  avgResponseTimeMs: number;
  cpuUsage: number;
  memoryUsage: number;
}

export interface AgentCapability {
  id: string;
  name: string;
  description: string;
}

export interface BaseAgent {
  id: string;
  name: string;
  role: AgentRole;
  status: AgentStatus;
  avatarUrl?: string;
  version: string;
  capabilities: AgentCapability[];
  metrics: AgentMetric;
  createdAt: string;
  updatedAt: string;
}

export interface BossAgent extends BaseAgent {
  role: 'boss';
  systemGoal: string;
  supervisorIds: string[];
}

export interface SupervisorAgent extends BaseAgent {
  role: 'supervisor';
  bossId: string;
  workerIds: string[];
  department: string;
}

export interface WorkerAgent extends BaseAgent {
  role: 'worker';
  supervisorId: string;
  model: string; // LLM underlying model e.g. 'gemini-2.5-pro'
  temperature: number;
}

export interface AgentMessage {
  id: string;
  senderId: string;
  senderRole: AgentRole | 'user';
  receiverId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'code' | 'command' | 'status_update' | 'result';
  metadata?: Record<string, unknown>;
}
