export type WorkflowNodeType =
  | 'boss'
  | 'supervisor'
  | 'worker'
  | 'validation'
  | 'review'
  | 'report'
  | 'database'
  | 'api';

export type WorkflowNodeStatus =
  | 'waiting'
  | 'planning'
  | 'queued'
  | 'assigned'
  | 'running'
  | 'blocked'
  | 'retrying'
  | 'completed'
  | 'failed'
  | 'cancelled';

export type WorkflowStatus = WorkflowNodeStatus;

export interface WorkflowExecutionLog {
  id?: string;
  timestamp: string;
  level?: string;
  message: string;
  step?: string;
}

export type WorkflowEdgeType =

  | 'task_assignment'
  | 'dependency'
  | 'communication'
  | 'validation'
  | 'completion'
  | 'retry'
  | 'data_flow';

export interface SystemHealthItem {
  id: string;
  name: string;
  type: 'boss' | 'supervisor' | 'workers' | 'database' | 'socket' | 'gemini';
  status: 'green' | 'yellow' | 'red';
  latencyMs: number;
  message: string;
}

export interface LiveEventItem {
  id: string;
  timestamp: string;
  type: 'node_created' | 'task_started' | 'task_completed' | 'retry_started' | 'message_sent' | 'validation_passed';
  title: string;
  detail: string;
  sourceNodeId?: string;
  targetNodeId?: string;
}

export interface AgentCommunicationPacket {
  id: string;
  timestamp: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  recipientName: string;
  message: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'sent' | 'received' | 'processing';
}

export interface WorkflowReplayState {
  isPlaying: boolean;
  speed: 1 | 2 | 4;
  currentStepIndex: number;
  totalSteps: number;
  scrubProgress: number; // 0 - 100%
}

export interface WorkflowExecution {
  id: string;
  name: string;
  status: WorkflowNodeStatus;
  progress: number;
}

export interface WorkflowNodeData extends Record<string, unknown> {

  id: string;
  label: string;

  nodeType: WorkflowNodeType;
  status: WorkflowNodeStatus;
  department?: string;
  assignedTaskId?: string;
  assignedTaskName?: string;
  currentStep?: string;
  progress: number; // 0 - 100%
  health: 'healthy' | 'busy' | 'overloaded' | 'failed' | 'idle';
  latencyMs: number;
  metrics?: {
    cpuUsage: number;
    memoryUsage: string;
    tokensUsed: number;
  };
  subtasks?: { id: string; title: string; status: string }[];
  logs?: { timestamp: string; message: string }[];
}
