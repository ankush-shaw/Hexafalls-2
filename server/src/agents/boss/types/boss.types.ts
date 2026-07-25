export type BossStatus =
  | 'idle'
  | 'receiving'
  | 'reading'
  | 'analyzing'
  | 'planning'
  | 'validating'
  | 'completed'
  | 'failed';

export type ComplexityLevel = 'simple' | 'medium' | 'complex' | 'enterprise';

export type ExecutionStrategy = 'sequential' | 'parallel' | 'mixed' | 'conditional';

export type BossDecision = 'approve' | 'reject' | 'needs_information' | 'needs_clarification' | 'ready_for_supervisor';

export type RequestType = 'analysis' | 'report' | 'audit' | 'research' | 'strategy' | 'execution' | 'other';

export interface IntentAnalysis {
  primaryGoal: string;
  secondaryGoals: string[];
  hiddenGoals: string[];
  requestType: RequestType;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  priority: number;         // 1–10
  confidence: number;       // 0–1
  expectedOutput: string;
  successCriteria: string[];
}

export interface ComplexityEstimation {
  level: ComplexityLevel;
  estimatedDurationMs: number;
  estimatedWorkers: number;
  estimatedQueueSize: number;
  rationale: string;
}

export interface DepartmentNode {
  id: string;
  name: string;
  role: string;
  estimatedTasks: number;
  priority: number;
}

export interface DependencyEdge {
  fromStageId: string;
  toStageId: string;
}

export interface WorkflowStage {
  stageId: string;
  name: string;
  department: string;
  description: string;
  estimatedDurationMs: number;
  dependencies: string[];       // stageIds that must complete first
  parallelizable: boolean;
}

export interface WorkflowGraph {
  stages: WorkflowStage[];
  edges: DependencyEdge[];
  executionStrategy: ExecutionStrategy;
}

export interface BossWorkflowData {
  workflowId: string;
  workflowName: string;
  conversationId: string;
  userId: string;
  prompt: string;
  voiceTranscript?: string;
  intent: IntentAnalysis;
  complexity: ComplexityEstimation;
  departments: DepartmentNode[];
  graph: WorkflowGraph;
  bossDecision: BossDecision;
  decisionRationale: string;
  overallConfidence: number;
  status: BossStatus;
  createdAt: Date;
  updatedAt: Date;
}
