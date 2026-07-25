export type WorkerState =
  | 'initializing'
  | 'waiting'
  | 'accepted'
  | 'planning'
  | 'running'
  | 'reviewing'
  | 'completed'
  | 'failed'
  | 'retrying'
  | 'paused'
  | 'cancelled';

export type WorkerHealth = 'healthy' | 'busy' | 'overloaded' | 'failed' | 'idle';

export type WorkerDepartment =
  | 'Data Science'
  | 'Sales'
  | 'Marketing'
  | 'Inventory'
  | 'Technical'
  | 'Support'
  | 'Analytics'
  | 'Finance'
  | 'HR'
  | 'CRM'
  | 'Operations'
  | 'Legal'
  | 'Research'
  | 'Custom';


export type WorkerMessageType =
  | 'task_assigned'
  | 'need_info'
  | 'dependency_complete'
  | 'task_finished'
  | 'retry_requested'
  | 'validation_failed';

export interface WorkerSubTask {
  id: string;
  title: string;
  status: 'waiting' | 'running' | 'completed' | 'failed';
  duration: string;
  progressPercent: number;
}

export interface WorkerExecutionLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'success';
  message: string;
  step: string;
}

export interface WorkerMessage {
  id: string;
  timestamp: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  recipientName: string;
  type: WorkerMessageType;
  content: string;
}

export interface WorkerResult {
  id: string;
  taskId: string;
  outputSummary: string;
  dataArtifactUrl?: string;
  executionTime: string;
  confidenceScore: number;
  completedAt: string;
  keyOutputs: string[];
}

export interface WorkerMetrics {
  cpuUsage: number; // e.g. 42%
  memoryUsage: string; // e.g. "256 MB"
  executionTime: string;
  completionPercent: number;
  avgSpeed: string;
  tokensUsed: number;
  apiRequests: number;
}

export interface WorkerAgent {
  id: string;
  name: string;
  department: WorkerDepartment;
  avatarColor: string;
  status: WorkerState;
  health: WorkerHealth;
  assignedTaskName: string;
  assignedTaskId: string;
  currentStep: string;
  progress: number; // 0 - 100%
  confidence: number; // 0 - 100%
  queuePosition: number;
  startedAt: string;
  elapsedTime: string;
  estimatedDuration: string;
  subtasks: WorkerSubTask[];
  logs: WorkerExecutionLog[];
  metrics: WorkerMetrics;
  result?: WorkerResult;
  errorReason?: string;
  retryCount: number;
}
