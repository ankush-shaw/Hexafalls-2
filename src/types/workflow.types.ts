import { type Node, type Edge } from '@xyflow/react';

export type WorkflowStatus = 'draft' | 'active' | 'running' | 'completed' | 'failed' | 'paused';

export interface WorkflowStep {
  id: string;
  name: string;
  description?: string;
  agentId?: string; // Assigned agent
  status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
  config: Record<string, unknown>;
  dependencies: string[]; // step IDs
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  status: WorkflowStatus;
  nodes: Node[];
  edges: Edge[];
  steps: WorkflowStep[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowExecutionLog {
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'success';
  message: string;
  stepId?: string;
  agentId?: string;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: Exclude<WorkflowStatus, 'draft' | 'active'>;
  startedAt: string;
  completedAt?: string;
  triggeredBy: string; // user ID or system scheduler
  currentStepId?: string;
  logs: WorkflowExecutionLog[];
}
