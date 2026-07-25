export type SupervisorStage =
  | 'receiving_workflow'
  | 'parsing_workflow'
  | 'analyzing_tasks'
  | 'building_queue'
  | 'creating_workers'
  | 'assigning_tasks'
  | 'monitoring'
  | 'retrying'
  | 'waiting'
  | 'completed';

export type QueueItemStatus = 'waiting' | 'running' | 'completed' | 'blocked' | 'retry' | 'failed' | 'cancelled';

export type QueueItemPriority = 'critical' | 'high' | 'medium' | 'low';

export interface SupervisorSubTask {
  id: string;
  title: string;
  status: QueueItemStatus;
  duration: string;
  workerId?: string;
  progressPercent: number;
}

export interface SupervisorTask {
  id: string;
  title: string;
  department: string;
  priority: QueueItemPriority;
  status: QueueItemStatus;
  estimatedDuration: string;
  assignedWorkerId?: string;
  assignedWorkerName?: string;
  subtasks: SupervisorSubTask[];
  dependencies: string[];
  progressPercent: number; // 0 - 100%
  retryCount: number;
  errorReason?: string;
}

export interface SupervisorWorker {
  id: string;
  name: string;
  type: string; // e.g. 'Finance Data Scraper', 'Legal Policy Verification Engine'
  status: 'initializing' | 'ready' | 'busy' | 'idle' | 'error';
  assignedTaskId?: string;
  currentStep: string;
  progress: number; // 0 - 100%
  utilizationPercent: number;
}

export interface SupervisorActivity {
  id: string;
  timestamp: string;
  type: 'worker_created' | 'task_assigned' | 'task_started' | 'task_completed' | 'task_failed' | 'retry_started';
  title: string;
  detail: string;
  workerName?: string;
}

export interface SupervisorCommunication {
  id: string;
  timestamp: string;
  sender: string;
  recipient: string;
  message: string;
  type: 'sent' | 'accepted' | 'progress' | 'completed' | 'error';
}

export interface SupervisorMetrics {
  runningTasks: number;
  waitingTasks: number;
  completedTasks: number;
  failedTasks: number;
  retryCount: number;
  successRate: number; // 0 - 100%
  workerUtilization: number; // 0 - 100%
  queueSize: number;
  avgDuration: string;
}

export interface SupervisorSession {
  sessionId: string;
  workflowId: string;
  executionId: string;
  stage: SupervisorStage;
  tasks: SupervisorTask[];
  workers: SupervisorWorker[];
  activities: SupervisorActivity[];
  communications: SupervisorCommunication[];
  metrics: SupervisorMetrics;
  currentAction: string;
  currentStepIndex: number;
  totalSteps: number;
  overallProgress: number; // 0 - 100%
  startTime: string;
  elapsedSeconds: number;
  isPaused: boolean;
}
