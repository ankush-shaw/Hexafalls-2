import { AgentStatus, AgentMessage } from './agent.types';
import { WorkflowStatus, WorkflowExecutionLog } from './workflow.types';

export interface ServerToClientEvents {
  // Agent Events
  'agent:status-changed': (data: { agentId: string; status: AgentStatus }) => void;
  'agent:message': (message: AgentMessage) => void;
  'agent:metrics-updated': (data: { agentId: string; metrics: Record<string, unknown> }) => void;

  // Workflow Events
  'workflow:status-changed': (data: { executionId: string; status: WorkflowStatus }) => void;
  'workflow:log': (data: { executionId: string; log: WorkflowExecutionLog }) => void;
  'workflow:step-completed': (data: { executionId: string; stepId: string; output: unknown }) => void;

  // System Events
  'system:notification': (notification: { id: string; title: string; message: string; type: 'info' | 'success' | 'warning' | 'error'; timestamp: string }) => void;
  'system:error': (error: { code: string; message: string }) => void;
  'system:stats': (stats: { activeAgentsCount: number; runningWorkflowsCount: number; cpuUsage: number; memoryUsage: number }) => void;
}

export interface ClientToServerEvents {
  // Agent Control
  'agent:start': (agentId: string) => void;
  'agent:stop': (agentId: string) => void;
  'agent:send-message': (data: { agentId: string; content: string; metadata?: Record<string, unknown> }) => void;

  // Workflow Control
  'workflow:execute': (workflowId: string, inputs?: Record<string, unknown>) => void;
  'workflow:pause': (executionId: string) => void;
  'workflow:resume': (executionId: string) => void;
  'workflow:terminate': (executionId: string) => void;

  // Room Subscription
  'subscribe:agent': (agentId: string) => void;
  'unsubscribe:agent': (agentId: string) => void;
  'subscribe:workflow': (executionId: string) => void;
  'unsubscribe:workflow': (executionId: string) => void;
}
