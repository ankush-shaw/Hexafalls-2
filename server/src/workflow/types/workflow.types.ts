export type WorkflowEngineState =
  | 'created'
  | 'queued'
  | 'waiting'
  | 'running'
  | 'paused'
  | 'retrying'
  | 'recovering'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'archived';

export interface WorkflowCheckpoint {
  checkpointId: string;
  workflowId: string;
  executionId: string;
  stepPosition: number;
  completedTaskIds: string[];
  queueState: Record<string, unknown>;
  progressPercent: number;
  createdAt: Date;
}

export interface WorkflowEngineMetrics {
  totalWorkflows: number;
  activeWorkflows: number;
  completedWorkflows: number;
  failedWorkflows: number;
  pausedWorkflows: number;
  avgDurationMs: number;
  overallSuccessRate: number;
}

export interface WorkflowEngineRecordData {
  engineWorkflowId: string;
  bossWorkflowId: string;
  supervisorExecutionId?: string;
  conversationId: string;
  userId: string;
  name: string;
  status: WorkflowEngineState;
  progressPercent: number;
  priority: number;
  executionStrategy: 'sequential' | 'parallel' | 'mixed' | 'conditional';
  completedTaskCount: number;
  totalTaskCount: number;
  retryCount: number;
  startedAt?: Date;
  completedAt?: Date;
  checkpoints: WorkflowCheckpoint[];
  metadata?: Record<string, unknown>;
}
