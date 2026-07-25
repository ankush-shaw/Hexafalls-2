export type BossPlanningStage =
  | 'idle'
  | 'receiving'
  | 'reading'
  | 'understanding'
  | 'thinking'
  | 'planning'
  | 'workflow_building'
  | 'validating'
  | 'completed';

export type BossEmotionState =
  | 'idle'
  | 'focused'
  | 'analytical'
  | 'strategic'
  | 'optimizing'
  | 'confident'
  | 'validating'
  | 'ready';

export type BusinessDomainType =
  | 'Finance'
  | 'Healthcare'
  | 'Technology'
  | 'Retail'
  | 'Education'
  | 'Manufacturing'
  | 'Government'
  | 'Construction'
  | 'Other';

export type ExecutionReadiness = 'ready' | 'waiting' | 'needs_information' | 'blocked' | 'review_required';

export type ApprovalStatus = 'draft' | 'reviewing' | 'optimizing' | 'approved' | 'handed_off';

export interface IntentAnalysisData {
  primaryIntent: string;
  primaryGoal: string;
  secondaryGoals: string[];
  businessDomain: BusinessDomainType;
  taskCategory: string;
  problemType: string;
  urgency: 'low' | 'medium' | 'high' | 'immediate';
  confidence: number; // 0 - 100%
}

export interface GoalItem {
  id: string;
  title: string;
  description: string;
  type: 'primary' | 'secondary' | 'optional';
  expectedOutput: string;
  successCriteria: string;
  impact: 'high' | 'medium' | 'low';
  urgency: 'high' | 'medium' | 'low';
}

export interface RequirementItem {
  id: string;
  title: string;
  department: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  reason: string;
  dependencies: string[];
  confidence: number;
}

export interface ConstraintItem {
  id: string;
  category: 'budget' | 'time' | 'missing_info' | 'external_dep' | 'blocked_res';
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
}

export interface EntityItem {
  id: string;
  name: string;
  category: 'person' | 'product' | 'department' | 'company' | 'location' | 'date' | 'number' | 'file';
  confidence: number;
}

export interface KeywordItem {
  keyword: string;
  confidence: number;
  relevance: number;
}

export interface RiskItem {
  id: string;
  level: 'low' | 'medium' | 'high';
  title: string;
  reason: string;
  recommendation: string;
}

export interface ContextEngineData {
  knownInfo: string[];
  unknownInfo: string[];
  assumptions: string[];
  missingData: string[];
  clarifyingQuestions?: string[];
}

export interface ExecutionStrategy {
  strategyName: string;
  planningStyle: 'Parallel Execution' | 'Sequential Phase' | 'Hybrid Waterfall-Agile';
  estimatedWorkers: number;
  estimatedDuration: string;
  executionConfidence: number;
  resourceEstimate: string;
  summary: string;
}

export interface WorkflowNodePreview {
  id: string;
  name: string;
  type: 'boss' | 'supervisor' | 'department' | 'output';
  purpose: string;
  reasonSelected: string;
  estimatedWorkload: number; // 0 - 100%
  priority: 'critical' | 'high' | 'medium' | 'low';
  dependencies: string[];
  confidence: number;
}

export interface WorkflowDependency {
  sourceId: string;
  targetId: string;
  reason: string;
}

export interface ValidationItem {
  id: string;
  label: string;
  description: string;
  status: 'passed' | 'pending' | 'warning';
}

export interface OptimizationDetails {
  beforeDuration: string;
  afterDuration: string;
  timeReductionPercent: number;
  optimizationSummary: string;
  changes: string[];
}

export interface BossDecisionState {
  approvalStatus: ApprovalStatus;
  readiness: ExecutionReadiness;
  decisionConfidence: number;
  estimatedSuccessRate: number;
  workflowNodes: WorkflowNodePreview[];
  workflowDependencies: WorkflowDependency[];
  validationChecklist: ValidationItem[];
  optimization: OptimizationDetails;
  performanceEstimation: {
    estimatedDuration: string;
    estimatedApiCalls: number;
    estimatedTokens: number;
    estimatedWorkers: number;
    estimatedCost: string;
  };
  confidenceBreakdown: {
    overall: number;
    planning: number;
    workflow: number;
    department: number;
    execution: number;
  };
  riskBreakdown: {
    overall: 'low' | 'medium' | 'high';
    technical: 'low' | 'medium' | 'high';
    business: 'low' | 'medium' | 'high';
    dependency: 'low' | 'medium' | 'high';
    recommendation: string;
  };
}

export interface BossContext {
  domain: string;
  taskType: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  urgency: 'low' | 'medium' | 'high' | 'immediate';
  departmentsNeeded: string[];
  complexityScore: number; // 1 - 100
  complexityLevel: 'Simple' | 'Medium' | 'Complex' | 'Enterprise';
  confidenceScore: number; // 0 - 100%
  planningAccuracy: number; // 0 - 100%
  riskLevel: 'low' | 'moderate' | 'high';
  estimatedDuration: string;
}

export interface ReasoningStep {
  id: string;
  stage: BossPlanningStage;
  title: string;
  detail: string;
  timestamp: string;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface MemorySnapshotItem {
  id: string;
  key: string;
  value: string;
  type: 'rule' | 'constraint' | 'historical_pattern' | 'preference';
}

export interface BossPlanningSession {
  sessionId: string;
  executionId: string;
  conversationId: string;
  userPrompt: string;
  stage: BossPlanningStage;
  emotion: BossEmotionState;
  context: BossContext;
  intent: IntentAnalysisData;
  goals: GoalItem[];
  requirements: RequirementItem[];
  constraints: ConstraintItem[];
  entities: EntityItem[];
  keywords: KeywordItem[];
  risk: RiskItem;
  contextEngine: ContextEngineData;
  strategy: ExecutionStrategy;
  decision: BossDecisionState;
  reasoningStream: ReasoningStep[];
  memorySnapshots: MemorySnapshotItem[];
  currentAction: string;
  currentStepIndex: number;
  totalSteps: number;
  overallProgress: number; // 0 - 100
  thinkingProgress: number;
  understandingProgress: number;
  planningProgress: number;
  validationProgress: number;
  startTime: string;
  elapsedSeconds: number;
  estimatedRemainingSeconds: number;
  isPaused: boolean;
}
