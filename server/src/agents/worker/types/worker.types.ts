export type WorkerRuntimeState =
  | 'created'
  | 'initialized'
  | 'ready'
  | 'assigned'
  | 'planning'
  | 'executing'
  | 'validating'
  | 'completed'
  | 'failed'
  | 'retrying'
  | 'destroyed';

export type WorkerHealthState =
  | 'healthy'
  | 'busy'
  | 'waiting'
  | 'failed'
  | 'retrying'
  | 'stopped'
  | 'offline';

export interface WorkerTaskContext {
  taskId: string;
  workflowId: string;
  executionId: string;
  department: string;
  taskName: string;
  description: string;
  dependencies: string[];
  requiredOutput: string;
  payload?: Record<string, unknown>;
}

export interface WorkerProgressUpdate {
  workerId: string;
  taskId: string;
  executionId: string;
  currentStep: number;
  totalSteps: number;
  stepName: string;
  progressPercent: number;
  estimatedRemainingMs: number;
  status: WorkerRuntimeState;
  timestamp: Date;
}

export interface WorkerExecutionResultPayload {
  taskId: string;
  workerId: string;
  executionId: string;
  status: 'completed' | 'failed';
  summary: string;
  output: Record<string, unknown>;
  confidence: number;
  executionTimeMs: number;
  logs: string[];
  metadata?: Record<string, unknown>;
}

export interface WorkerAgentData {
  workerId: string;
  executionId: string;
  department: string;
  capabilities: string[];
  currentTaskId?: string;
  status: WorkerRuntimeState;
  health: WorkerHealthState;
  priority: number;
  currentStep: number;
  progressPercent: number;
  startedTime?: Date;
  finishedTime?: Date;
  metadata?: Record<string, unknown>;
}
