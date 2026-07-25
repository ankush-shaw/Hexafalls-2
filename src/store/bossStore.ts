import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  BossPlanningStage,
  BossEmotionState,
  BossContext,
  ReasoningStep,
  BossPlanningSession,
  MemorySnapshotItem,
  IntentAnalysisData,
  GoalItem,
  RequirementItem,
  ConstraintItem,
  EntityItem,
  KeywordItem,
  RiskItem,
  ContextEngineData,
  ExecutionStrategy,
  BossDecisionState,
  WorkflowNodePreview,
  ValidationItem,
} from '../types/boss.types';

interface BossState {
  currentSession: BossPlanningSession | null;
  historySessions: BossPlanningSession[];
  isPlanningActive: boolean;
}

interface BossActions {
  startPlanning: (prompt: string) => void;
  pausePlanning: () => void;
  resumePlanning: () => void;
  resetPlanning: () => void;
  tickTimer: () => void;
  stepForward: () => void;
  loadDemoSession: () => void;
  approvePlan: () => void;
  optimizeWorkflow: () => void;
  replanSession: () => void;
}

type BossStore = BossState & BossActions;

const DEMO_WORKFLOW_NODES: WorkflowNodePreview[] = [
  {
    id: 'node-boss',
    name: 'Boss Agent CEO',
    type: 'boss',
    purpose: 'Strategic intent parsing & cross-department plan validation',
    reasonSelected: 'Orchestrating multi-department DAG graph',
    estimatedWorkload: 100,
    priority: 'critical',
    dependencies: [],
    confidence: 99,
  },
  {
    id: 'node-sup-alpha',
    name: 'Supervisor Agent Alpha',
    type: 'supervisor',
    purpose: 'Department task distribution & worker thread allocation',
    reasonSelected: 'Assigned to oversee Finance & Data Science worker teams',
    estimatedWorkload: 85,
    priority: 'critical',
    dependencies: ['node-boss'],
    confidence: 97,
  },
  {
    id: 'node-dept-fin',
    name: 'Finance Department',
    type: 'department',
    purpose: 'Income statement audit & EBITDA margin calculation',
    reasonSelected: 'Primary requirement for Q4 performance evaluation',
    estimatedWorkload: 90,
    priority: 'critical',
    dependencies: ['node-sup-alpha'],
    confidence: 98,
  },
  {
    id: 'node-dept-ds',
    name: 'Data Science Dept',
    type: 'department',
    purpose: 'Competitor pricing scrape & feature matrix classification',
    reasonSelected: 'Scrapes competitor tiers via Web Worker #4',
    estimatedWorkload: 78,
    priority: 'high',
    dependencies: ['node-sup-alpha'],
    confidence: 94,
  },
  {
    id: 'node-dept-legal',
    name: 'Legal & Risk Compliance',
    type: 'department',
    purpose: 'Governance verification & data privacy audit',
    reasonSelected: 'Ensures no budget violation or policy conflict',
    estimatedWorkload: 60,
    priority: 'high',
    dependencies: ['node-dept-fin'],
    confidence: 99,
  },
  {
    id: 'node-dept-ops',
    name: 'Operations & Scaling',
    type: 'department',
    purpose: 'Dynamic worker thread pool management',
    reasonSelected: 'Scales concurrent execution threads up to 10 workers',
    estimatedWorkload: 70,
    priority: 'medium',
    dependencies: ['node-sup-alpha'],
    confidence: 95,
  },
  {
    id: 'node-dept-mktg',
    name: 'Marketing Intelligence',
    type: 'department',
    purpose: 'Strategic recommendations & competitor positioning map',
    reasonSelected: 'Translates data science insights into executive strategy',
    estimatedWorkload: 65,
    priority: 'medium',
    dependencies: ['node-dept-ds'],
    confidence: 92,
  },
  {
    id: 'node-output',
    name: 'Executive PDF Summary',
    type: 'output',
    purpose: 'Final aggregated report deliverable for CEO review',
    reasonSelected: 'Consolidates all department outputs into PDF deliverable',
    estimatedWorkload: 100,
    priority: 'critical',
    dependencies: ['node-dept-fin', 'node-dept-legal', 'node-dept-mktg'],
    confidence: 98,
  },
];

const DEMO_VALIDATION: ValidationItem[] = [
  { id: 'val-1', label: 'Intent Validated', description: 'User request prompt matched to Finance & Audit business domain.', status: 'passed' },
  { id: 'val-2', label: 'Requirements Complete', description: '4 department prerequisites identified and verified against API schema.', status: 'passed' },
  { id: 'val-3', label: 'Dependencies Verified', description: 'No cyclic deadlocks found in 8-node DAG workflow graph.', status: 'passed' },
  { id: 'val-4', label: 'Resources Available', description: '8 worker threads reserved in Operations thread pool.', status: 'passed' },
  { id: 'val-5', label: 'Strategy Approved', description: 'Parallel execution strategy validated by Boss CEO reasoning engine.', status: 'passed' },
  { id: 'val-6', label: 'Timeline Estimated', description: 'Total execution window estimated at 3m 45s.', status: 'passed' },
  { id: 'val-7', label: 'Risk Accepted', description: 'Low risk classification confirmed under current rate limits.', status: 'passed' },
];

const DEMO_DECISION: BossDecisionState = {
  approvalStatus: 'reviewing',
  readiness: 'ready',
  decisionConfidence: 98,
  estimatedSuccessRate: 96,
  workflowNodes: DEMO_WORKFLOW_NODES,
  workflowDependencies: [
    { sourceId: 'node-boss', targetId: 'node-sup-alpha', reason: 'CEO delegates to Supervisor Alpha' },
    { sourceId: 'node-sup-alpha', targetId: 'node-dept-fin', reason: 'Finance audit task' },
    { sourceId: 'node-sup-alpha', targetId: 'node-dept-ds', reason: 'Competitor scrape task' },
    { sourceId: 'node-dept-fin', targetId: 'node-dept-legal', reason: 'Compliance check' },
    { sourceId: 'node-dept-ds', targetId: 'node-dept-mktg', reason: 'Marketing positioning' },
    { sourceId: 'node-dept-legal', targetId: 'node-output', reason: 'Final report synthesis' },
  ],
  validationChecklist: DEMO_VALIDATION,
  optimization: {
    beforeDuration: '5m 12s',
    afterDuration: '3m 45s',
    timeReductionPercent: 28,
    optimizationSummary: 'Boss Agent merged redundant API calls and enabled parallel worker execution for Finance and Data Science.',
    changes: [
      'Parallelized competitor scrape & financial audit streams',
      'Pre-allocated 8 worker threads in Operations pool',
      'Enabled streaming response synthesis for executive report',
    ],
  },
  performanceEstimation: {
    estimatedDuration: '3m 45s',
    estimatedApiCalls: 42,
    estimatedTokens: 124500,
    estimatedWorkers: 8,
    estimatedCost: '$0.18',
  },
  confidenceBreakdown: {
    overall: 98,
    planning: 99,
    workflow: 97,
    department: 96,
    execution: 98,
  },
  riskBreakdown: {
    overall: 'low',
    technical: 'low',
    business: 'low',
    dependency: 'low',
    recommendation: 'Plan is fully validated and ready for immediate Supervisor hand-off.',
  },
};

const DEMO_CONTEXT: BossContext = {
  domain: 'Enterprise Market Strategy & Operations',
  taskType: 'Multi-Department Execution Plan',
  priority: 'high',
  urgency: 'immediate',
  departmentsNeeded: ['Finance', 'Data Science', 'Legal & Risk', 'Operations', 'Marketing'],
  complexityScore: 88,
  complexityLevel: 'Enterprise',
  confidenceScore: 96,
  planningAccuracy: 98.4,
  riskLevel: 'low',
  estimatedDuration: '3m 45s',
};

const DEMO_INTENT: IntentAnalysisData = {
  primaryIntent: 'Execute End-to-End Business Performance & Competitor Audit',
  primaryGoal: 'Decompose strategic objectives into multi-department execution plans for Q4 evaluation.',
  secondaryGoals: [
    'Benchmarking top 3 competitor features and pricing models',
    'Synthesizing Q4 EBITDA and margin expansion opportunities',
    'Mitigating legal and operational risk factors',
  ],
  businessDomain: 'Finance',
  taskCategory: 'Strategic Planning & Analytics',
  problemType: 'Cross-Department Automation',
  urgency: 'immediate',
  confidence: 96,
};

const DEMO_GOALS: GoalItem[] = [
  {
    id: 'goal-1',
    title: 'Competitor Feature & Pricing Benchmark',
    description: 'Scrape and classify product capabilities and pricing tiers across top 3 industry rivals.',
    type: 'primary',
    expectedOutput: 'Interactive Feature Matrix CSV & Comparative Summary Table',
    successCriteria: '100% coverage of core pricing packages with accuracy >95%',
    impact: 'high',
    urgency: 'high',
  },
  {
    id: 'goal-2',
    title: 'Q4 Financial Statement Audit',
    description: 'Synthesize EBITDA expansion metrics, revenue growth YoY, and cash flow forecasts.',
    type: 'primary',
    expectedOutput: 'Executive Summary PDF Report with financial charts',
    successCriteria: 'Zero mathematical variance across income statement line items',
    impact: 'high',
    urgency: 'high',
  },
  {
    id: 'goal-3',
    title: 'Operational Workflow Optimization',
    description: 'Identify bottlenecks in task delegation between Supervisor Alpha and dynamic Worker nodes.',
    type: 'secondary',
    expectedOutput: 'DAG Workflow Graph with execution latency breakdown',
    successCriteria: 'Reduce estimated execution time under 4 minutes',
    impact: 'medium',
    urgency: 'medium',
  },
  {
    id: 'goal-4',
    title: 'Customer Sentiment Clustering',
    description: 'Group user feedback into positive, neutral, and negative sentiment clusters.',
    type: 'optional',
    expectedOutput: 'Sentiment Cluster Map & Top 5 feature requests list',
    successCriteria: 'Cluster confidence score >85%',
    impact: 'low',
    urgency: 'low',
  },
];

const DEMO_REQUIREMENTS: RequirementItem[] = [
  {
    id: 'req-1',
    title: 'Q4 Income Statement Dataset',
    department: 'Finance',
    priority: 'critical',
    reason: 'Necessary for financial audit and revenue variance modeling.',
    dependencies: ['Finance DB Access API'],
    confidence: 98,
  },
  {
    id: 'req-2',
    title: 'Competitor Pricing API Stream',
    department: 'Data Science',
    priority: 'high',
    reason: 'Required for automated feature & pricing tier extraction.',
    dependencies: ['Web Scraper Worker #4'],
    confidence: 94,
  },
  {
    id: 'req-3',
    title: 'Compliance & Governance Checks',
    department: 'Legal & Risk',
    priority: 'high',
    reason: 'Must verify data handling policies before generating external PDF reports.',
    dependencies: ['Legal Policy Engine'],
    confidence: 99,
  },
  {
    id: 'req-4',
    title: 'Worker Scaling Allocation',
    department: 'Operations',
    priority: 'medium',
    reason: 'Reserve up to 8 worker threads for parallel task execution.',
    dependencies: ['Supervisor Alpha Allocation'],
    confidence: 91,
  },
];

const DEMO_CONSTRAINTS: ConstraintItem[] = [
  {
    id: 'const-1',
    category: 'budget',
    title: 'API Token Budget Cap',
    description: 'Max 150,000 LLM tokens per execution session to prevent cost overruns.',
    severity: 'medium',
  },
  {
    id: 'const-2',
    category: 'time',
    title: 'Execution Time Window',
    description: 'Planning and delegation must complete within 4 minutes total.',
    severity: 'high',
  },
  {
    id: 'const-3',
    category: 'external_dep',
    title: 'Third-Party Scraper Rate Limits',
    description: 'Competitor data retrieval throttled at 5 requests per second.',
    severity: 'medium',
  },
];

const DEMO_ENTITIES: EntityItem[] = [
  { id: 'ent-1', name: 'Boss Agent CEO', category: 'department', confidence: 99 },
  { id: 'ent-2', name: 'Supervisor Alpha', category: 'department', confidence: 97 },
  { id: 'ent-3', name: 'Q4 Income Statement.pdf', category: 'file', confidence: 96 },
  { id: 'ent-4', name: 'AegisOS Enterprise', category: 'company', confidence: 99 },
  { id: 'ent-5', name: 'Q4 2026', category: 'date', confidence: 98 },
  { id: 'ent-6', name: '$50,000 Budget Cap', category: 'number', confidence: 95 },
];

const DEMO_KEYWORDS: KeywordItem[] = [
  { keyword: 'Competitor Audit', confidence: 98, relevance: 96 },
  { keyword: 'Financial EBITDA', confidence: 96, relevance: 94 },
  { keyword: 'Multi-Agent Pipeline', confidence: 99, relevance: 99 },
  { keyword: 'Risk Assessment', confidence: 92, relevance: 88 },
  { keyword: 'DAG Workflow', confidence: 95, relevance: 90 },
];

const DEMO_RISK: RiskItem = {
  id: 'risk-1',
  level: 'low',
  title: 'Low Operational Risk Detected',
  reason: 'All requested departments are online and token budgets are well within safety boundaries.',
  recommendation: 'Proceed with Supervisor Agent delegation using parallel worker threads.',
};

const DEMO_CONTEXT_ENGINE: ContextEngineData = {
  knownInfo: [
    'User requests comprehensive competitor & financial analysis for Q4.',
    'System holds active tokens for Finance DB, Legal Engine, and Worker scaling.',
    'Boss Agent CEO planning accuracy is currently at 98.4%.',
  ],
  unknownInfo: [
    'Exact real-time API latency for 3rd party competitor price scrapers.',
  ],
  assumptions: [
    'Assuming Q4 financial figures are finalized and audited internally.',
    'Assuming Worker pool scalability up to 10 concurrent threads.',
  ],
  missingData: [
    'Historical Q3 competitor pricing delta CSV (optional fallback).',
  ],
};

const DEMO_STRATEGY: ExecutionStrategy = {
  strategyName: 'Hybrid Parallel Department Delegation Plan',
  planningStyle: 'Parallel Execution',
  estimatedWorkers: 8,
  estimatedDuration: '3m 45s',
  executionConfidence: 96,
  resourceEstimate: '120k Tokens · 8 Worker Threads · 2 Supervisor Nodes',
  summary: 'Boss Agent CEO will decompose the request into 2 parallel Supervisor streams (Finance Audit & Competitor Scrape) before synthesizing results into a unified executive report.',
};

const DEMO_MEMORY: MemorySnapshotItem[] = [
  { id: 'mem-1', key: 'Corporate Governance', value: 'Requires legal validation for >$50k budget allocation', type: 'rule' },
  { id: 'mem-2', key: 'Worker Scaling Policy', value: 'Max 10 concurrent worker threads per supervisor', type: 'constraint' },
  { id: 'mem-3', key: 'Prior Q3 Benchmarks', value: 'Financial audits averaged 94.2% accuracy under 4m execution', type: 'historical_pattern' },
  { id: 'mem-4', key: 'Executive Preference', value: 'Always include risk mitigation matrix in final report', type: 'preference' },
];

const INITIAL_REASONING_STEPS: ReasoningStep[] = [
  { id: 'step-1', stage: 'receiving', title: 'Reading User Request', detail: 'Parsing text tokens and extracting business intent from incoming prompt.', timestamp: '00:01', status: 'completed' },
  { id: 'step-2', stage: 'reading', title: 'Understanding Intent & Requirements', detail: 'Identified core objectives: competitor benchmarking, financial audit, and strategy synthesis.', timestamp: '00:03', status: 'completed' },
  { id: 'step-3', stage: 'understanding', title: 'Extracting Key Goals & Constraints', detail: 'Isolated 4 distinct deliverables across 5 enterprise departments.', timestamp: '00:07', status: 'completed' },
  { id: 'step-4', stage: 'thinking', title: 'Evaluating Workload Complexity & Dependencies', detail: 'Calculated complexity score of 88/100 based on cross-department data dependencies.', timestamp: '00:12', status: 'completed' },
  { id: 'step-5', stage: 'planning', title: 'Identifying Required Departments', detail: 'Allocating tasks to Finance, Data Science, Operations, Legal, and Marketing.', timestamp: '00:18', status: 'completed' },
  { id: 'step-6', stage: 'workflow_building', title: 'Creating Execution Strategy & Workflow Graph', detail: 'Constructing DAG node hierarchy for Supervisor Agent Alpha & Beta delegation.', timestamp: '00:25', status: 'completed' },
  { id: 'step-7', stage: 'validating', title: 'Validating Plan & Risk Mitigation', detail: 'Running safety assertions, token budget limits, and risk assessments.', timestamp: '00:32', status: 'completed' },
  { id: 'step-8', stage: 'completed', title: 'Plan Approved — Ready for Supervisor Hand-off', detail: 'Boss Agent CEO has finalized the execution blueprint.', timestamp: '00:40', status: 'completed' },
];

export const useBossStore = create<BossStore>()(
  devtools(
    persist(
      (set, get) => ({
        currentSession: null,
        historySessions: [],
        isPlanningActive: false,

        startPlanning: (prompt: string) => {
          const newSession: BossPlanningSession = {
            sessionId: `sess-${Date.now()}`,
            executionId: `EXEC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
            conversationId: `conv-${Date.now()}`,
            userPrompt: prompt,
            stage: 'receiving',
            emotion: 'focused',
            context: DEMO_CONTEXT,
            intent: DEMO_INTENT,
            goals: DEMO_GOALS,
            requirements: DEMO_REQUIREMENTS,
            constraints: DEMO_CONSTRAINTS,
            entities: DEMO_ENTITIES,
            keywords: DEMO_KEYWORDS,
            risk: DEMO_RISK,
            contextEngine: DEMO_CONTEXT_ENGINE,
            strategy: DEMO_STRATEGY,
            decision: DEMO_DECISION,
            reasoningStream: INITIAL_REASONING_STEPS.map((s, idx) => ({
              ...s,
              status: idx === 0 ? 'in_progress' : 'pending',
            })),
            memorySnapshots: DEMO_MEMORY,
            currentAction: 'Receiving request & reading user intent...',
            currentStepIndex: 1,
            totalSteps: INITIAL_REASONING_STEPS.length,
            overallProgress: 10,
            thinkingProgress: 15,
            understandingProgress: 10,
            planningProgress: 5,
            validationProgress: 0,
            startTime: new Date().toISOString(),
            elapsedSeconds: 0,
            estimatedRemainingSeconds: 45,
            isPaused: false,
          };

          set({ currentSession: newSession, isPlanningActive: true });
        },

        pausePlanning: () => {
          const session = get().currentSession;
          if (session) {
            set({ currentSession: { ...session, isPaused: true } });
          }
        },

        resumePlanning: () => {
          const session = get().currentSession;
          if (session) {
            set({ currentSession: { ...session, isPaused: false } });
          }
        },

        resetPlanning: () => {
          set({ currentSession: null, isPlanningActive: false });
        },

        tickTimer: () => {
          const session = get().currentSession;
          if (!session || session.isPaused || session.stage === 'completed') return;

          set({
            currentSession: {
              ...session,
              elapsedSeconds: session.elapsedSeconds + 1,
              estimatedRemainingSeconds: Math.max(0, session.estimatedRemainingSeconds - 1),
            },
          });
        },

        stepForward: () => {
          const session = get().currentSession;
          if (!session || session.stage === 'completed') return;

          const stages: BossPlanningStage[] = [
            'receiving',
            'reading',
            'understanding',
            'thinking',
            'planning',
            'workflow_building',
            'validating',
            'completed',
          ];

          const emotions: BossEmotionState[] = [
            'focused',
            'analytical',
            'analytical',
            'strategic',
            'optimizing',
            'validating',
            'confident',
            'ready',
          ];

          const currentIndex = stages.indexOf(session.stage);
          const nextIndex = Math.min(currentIndex + 1, stages.length - 1);
          const nextStage = stages[nextIndex];
          const nextEmotion = emotions[nextIndex];

          const progressStep = Math.round(((nextIndex + 1) / stages.length) * 100);

          const updatedSteps = session.reasoningStream.map((s, i) => {
            if (i < nextIndex) return { ...s, status: 'completed' as const };
            if (i === nextIndex) return { ...s, status: 'in_progress' as const };
            return { ...s, status: 'pending' as const };
          });

          const actions: Record<BossPlanningStage, string> = {
            idle: 'Awaiting prompt...',
            receiving: 'Receiving request & reading user intent...',
            reading: 'Analyzing prompt semantic structure & tokens...',
            understanding: 'Extracting key business goals & constraints...',
            thinking: 'Decomposing workload into department tasks...',
            planning: 'Constructing execution strategy & task hierarchy...',
            workflow_building: 'Generating DAG workflow graph for Supervisors...',
            validating: 'Running safety, risk, and resource validation...',
            completed: 'Execution Blueprint Approved. Ready for Supervisor Hand-off.',
          };

          set({
            currentSession: {
              ...session,
              stage: nextStage,
              emotion: nextEmotion,
              currentAction: actions[nextStage],
              currentStepIndex: nextIndex + 1,
              overallProgress: progressStep,
              thinkingProgress: Math.min(100, progressStep + 10),
              understandingProgress: Math.min(100, progressStep + 15),
              planningProgress: Math.min(100, Math.max(0, progressStep - 10)),
              validationProgress: nextStage === 'completed' ? 100 : nextStage === 'validating' ? 65 : 0,
              reasoningStream: updatedSteps,
            },
          });
        },

        loadDemoSession: () => {
          const demoPrompt =
            'Orchestrate a comprehensive Q4 Competitor & Financial Audit for Boss Agent CEO. Decompose goals across Finance, Operations, Data Science, and Marketing. Estimate complexity and construct a validated execution strategy.';

          get().startPlanning(demoPrompt);
        },

        approvePlan: () => {
          const session = get().currentSession;
          if (!session) return;

          set({
            currentSession: {
              ...session,
              stage: 'completed',
              emotion: 'ready',
              overallProgress: 100,
              validationProgress: 100,
              decision: {
                ...session.decision,
                approvalStatus: 'handed_off',
                readiness: 'ready',
              },
            },
          });
        },

        optimizeWorkflow: () => {
          const session = get().currentSession;
          if (!session) return;

          set({
            currentSession: {
              ...session,
              emotion: 'optimizing',
              decision: {
                ...session.decision,
                approvalStatus: 'optimizing',
                optimization: {
                  ...session.decision.optimization,
                  afterDuration: '2m 50s',
                  timeReductionPercent: 45,
                  changes: [
                    ...session.decision.optimization.changes,
                    'Merged duplicate dataset queries across Finance and Legal',
                  ],
                },
              },
            },
          });
        },

        replanSession: () => {
          const session = get().currentSession;
          if (!session) return;

          set({
            currentSession: {
              ...session,
              stage: 'thinking',
              emotion: 'analytical',
              overallProgress: 50,
              decision: {
                ...session.decision,
                approvalStatus: 'reviewing',
              },
            },
          });
        },
      }),
      {
        name: 'aegisos-boss-store',
        partialize: (state) => ({
          currentSession: state.currentSession,
        }),
      }
    ),
    { name: 'BossStore' }
  )
);
