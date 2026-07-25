export type SupervisorStatus =
  | 'idle'
  | 'receiving_workflow'
  | 'parsing'
  | 'generating_tasks'
  | 'scheduling'
  | 'assigning'
  | 'executing'
  | 'monitoring'
  | 'retrying'
  | 'collecting_results'
  | 'completed'
  | 'failed'
  | 'cancelled';

export type TaskStatus =
  | 'pending'
  | 'queued'
  | 'assigned'
  | 'running'
  | 'completed'
  | 'failed'
  | 'retrying'
  | 'cancelled';

export type WorkerStatus =
  | 'idle'
  | 'busy'
  | 'waiting'
  | 'paused'
  | 'failed'
  | 'offline'
  | 'healthy';

export interface ExecutableSubtask {
  subtaskId: string;
  parentTaskId: string;
  title: string;
  executionOrder: number;
  status: TaskStatus;
  result?: string;
  error?: string;
}

export interface ExecutableTask {
  taskId: string;
  workflowId: string;
  stageId: string;
  department: string;
  taskName: string;
  description: string;
  priority: number;
  dependencies: string[];        // taskIds that must finish before this task
  subtasks: ExecutableSubtask[];
  assignedWorkerId?: string;
  status: TaskStatus;
  retryCount: number;
  maxRetries: number;
  estimatedDurationMs: number;
  startedAt?: Date;
  completedAt?: Date;
  resultData?: Record<string, unknown>;
  errorMessage?: string;
}

export interface WorkerNode {
  workerId: string;
  workerName: string;
  department: string;
  capabilities: string[];
  status: WorkerStatus;
  currentTaskId?: string;
  completedTaskCount: number;
  failedTaskCount: number;
  lastHeartbeat: Date;
  cpuLoadPercent: number;
  memoryUsageMB: number;
}

export interface SupervisorExecutionData {
  executionId: string;
  workflowId: string;
  conversationId: string;
  userId: string;
  status: SupervisorStatus;
  progressPercent: number;
  tasks: ExecutableTask[];
  workers: WorkerNode[];
  startedAt: Date;
  completedAt?: Date;
  executionMode: 'sequential' | 'parallel' | 'mixed' | 'conditional';
  collectedResults?: Record<string, unknown>;
  errorMessage?: string;
}
