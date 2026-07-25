import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  SupervisorStage,
  SupervisorTask,
  SupervisorWorker,
  SupervisorActivity,
  SupervisorCommunication,
  SupervisorMetrics,
  SupervisorSession,
} from '../types/supervisor.types';

interface SupervisorState {
  currentSession: SupervisorSession | null;
  historySessions: SupervisorSession[];
  isOrchestratingActive: boolean;
}

interface SupervisorActions {
  startOrchestration: (workflowId?: string) => void;
  pauseOrchestration: () => void;
  resumeOrchestration: () => void;
  resetOrchestration: () => void;
  tickTimer: () => void;
  stepForward: () => void;
  retryTask: (taskId: string) => void;
  loadDemoSupervisorSession: () => void;
}

type SupervisorStore = SupervisorState & SupervisorActions;

const DEMO_TASKS: SupervisorTask[] = [
  {
    id: 'task-101',
    title: 'Competitor Price Scraping & Feature Extraction',
    department: 'Data Science',
    priority: 'high',
    status: 'running',
    estimatedDuration: '45s',
    assignedWorkerId: 'worker-ds-01',
    assignedWorkerName: 'Worker DS-Alpha',
    subtasks: [
      { id: 'sub-1', title: 'Initialize Web Scraper #4', status: 'completed', duration: '5s', workerId: 'worker-ds-01', progressPercent: 100 },
      { id: 'sub-2', title: 'Parse Competitor Tier Table', status: 'running', duration: '20s', workerId: 'worker-ds-01', progressPercent: 65 },
      { id: 'sub-3', title: 'Format CSV Dataset Output', status: 'waiting', duration: '10s', workerId: 'worker-ds-01', progressPercent: 0 },
    ],
    dependencies: [],
    progressPercent: 65,
    retryCount: 0,
  },
  {
    id: 'task-102',
    title: 'Q4 EBITDA & Income Statement Synthesis',
    department: 'Finance',
    priority: 'critical',
    status: 'running',
    estimatedDuration: '1m 15s',
    assignedWorkerId: 'worker-fin-01',
    assignedWorkerName: 'Worker Finance-Beta',
    subtasks: [
      { id: 'sub-4', title: 'Query Internal Finance DB', status: 'completed', duration: '12s', workerId: 'worker-fin-01', progressPercent: 100 },
      { id: 'sub-5', title: 'Compute Margin Variance YoY', status: 'running', duration: '30s', workerId: 'worker-fin-01', progressPercent: 80 },
      { id: 'sub-6', title: 'Generate Balance Sheet Chart', status: 'waiting', duration: '15s', workerId: 'worker-fin-01', progressPercent: 0 },
    ],
    dependencies: [],
    progressPercent: 75,
    retryCount: 0,
  },
  {
    id: 'task-103',
    title: 'Legal Policy & Compliance Verification',
    department: 'Legal & Risk',
    priority: 'high',
    status: 'waiting',
    estimatedDuration: '30s',
    assignedWorkerId: 'worker-leg-01',
    assignedWorkerName: 'Worker Legal-Gamma',
    subtasks: [
      { id: 'sub-7', title: 'Check Budget Allocation Policy', status: 'waiting', duration: '10s', workerId: 'worker-leg-01', progressPercent: 0 },
      { id: 'sub-8', title: 'Verify Data Privacy Standards', status: 'waiting', duration: '15s', workerId: 'worker-leg-01', progressPercent: 0 },
    ],
    dependencies: ['task-102'],
    progressPercent: 0,
    retryCount: 0,
  },
  {
    id: 'task-104',
    title: 'Worker Thread Pool Allocation',
    department: 'Operations',
    priority: 'medium',
    status: 'completed',
    estimatedDuration: '15s',
    assignedWorkerId: 'worker-ops-01',
    assignedWorkerName: 'Worker Ops-Delta',
    subtasks: [
      { id: 'sub-9', title: 'Reserve 8 Execution Threads', status: 'completed', duration: '5s', workerId: 'worker-ops-01', progressPercent: 100 },
      { id: 'sub-10', title: 'Configure Rate-Limiter Throttles', status: 'completed', duration: '10s', workerId: 'worker-ops-01', progressPercent: 100 },
    ],
    dependencies: [],
    progressPercent: 100,
    retryCount: 0,
  },
  {
    id: 'task-105',
    title: 'Competitor Positioning Strategy Synthesis',
    department: 'Marketing',
    priority: 'medium',
    status: 'blocked',
    estimatedDuration: '40s',
    assignedWorkerId: 'worker-mktg-01',
    assignedWorkerName: 'Worker Mktg-Epsilon',
    subtasks: [
      { id: 'sub-11', title: 'Aggregate Scraped Pricing Insights', status: 'waiting', duration: '20s', workerId: 'worker-mktg-01', progressPercent: 0 },
      { id: 'sub-12', title: 'Draft Executive Strategy Deck', status: 'waiting', duration: '20s', workerId: 'worker-mktg-01', progressPercent: 0 },
    ],
    dependencies: ['task-101'],
    progressPercent: 0,
    retryCount: 0,
  },
  {
    id: 'task-106',
    title: 'Third-Party Scraper API Re-connect',
    department: 'Data Science',
    priority: 'high',
    status: 'retry',
    estimatedDuration: '20s',
    assignedWorkerId: 'worker-ds-02',
    assignedWorkerName: 'Worker DS-Retry',
    subtasks: [
      { id: 'sub-13', title: 'Re-try Scraper Connection #2', status: 'running', duration: '10s', workerId: 'worker-ds-02', progressPercent: 30 },
    ],
    dependencies: [],
    progressPercent: 30,
    retryCount: 1,
    errorReason: 'HTTP 429 Rate Limit Throttled — Retrying in 5s',
  },
];

const DEMO_WORKERS: SupervisorWorker[] = [
  {
    id: 'worker-ds-01',
    name: 'Worker DS-Alpha',
    type: 'Competitor Price Scraper',
    status: 'busy',
    assignedTaskId: 'task-101',
    currentStep: 'Parsing Competitor Tier Table',
    progress: 65,
    utilizationPercent: 88,
  },
  {
    id: 'worker-fin-01',
    name: 'Worker Finance-Beta',
    type: 'Financial Audit Engine',
    status: 'busy',
    assignedTaskId: 'task-102',
    currentStep: 'Compute Margin Variance YoY',
    progress: 75,
    utilizationPercent: 94,
  },
  {
    id: 'worker-leg-01',
    name: 'Worker Legal-Gamma',
    type: 'Governance Check Engine',
    status: 'idle',
    assignedTaskId: 'task-103',
    currentStep: 'Awaiting Finance task completion',
    progress: 0,
    utilizationPercent: 12,
  },
  {
    id: 'worker-ops-01',
    name: 'Worker Ops-Delta',
    type: 'Thread Pool Manager',
    status: 'ready',
    assignedTaskId: 'task-104',
    currentStep: 'All 8 worker threads reserved',
    progress: 100,
    utilizationPercent: 45,
  },
  {
    id: 'worker-mktg-01',
    name: 'Worker Mktg-Epsilon',
    type: 'Positioning Analyst',
    status: 'idle',
    assignedTaskId: 'task-105',
    currentStep: 'Blocked on Data Science task-101',
    progress: 0,
    utilizationPercent: 0,
  },
];

const DEMO_ACTIVITIES: SupervisorActivity[] = [
  { id: 'act-1', timestamp: '00:02', type: 'worker_created', title: 'Dynamic Worker Pool Provisioned', detail: 'Supervisor AI created 5 active worker agent nodes.', workerName: 'Supervisor COO' },
  { id: 'act-2', timestamp: '00:05', type: 'task_assigned', title: 'Tasks Dispatched', detail: 'Assigned task-101 to Worker DS-Alpha and task-102 to Worker Finance-Beta.', workerName: 'Worker DS-Alpha' },
  { id: 'act-3', timestamp: '00:12', type: 'task_started', title: 'Financial DB Audit In-Progress', detail: 'Worker Finance-Beta queried internal income statement records.', workerName: 'Worker Finance-Beta' },
  { id: 'act-4', timestamp: '00:20', type: 'task_completed', title: 'Ops Thread Allocation Complete', detail: 'Worker Ops-Delta finished reserving 8 execution threads.', workerName: 'Worker Ops-Delta' },
  { id: 'act-5', timestamp: '00:28', type: 'task_failed', title: 'API Rate Throttling Detected', detail: 'Scraper task encountered HTTP 429. Triggered automatic retry engine.', workerName: 'Worker DS-Retry' },
  { id: 'act-6', timestamp: '00:30', type: 'retry_started', title: 'Retry Attempt #1 Executing', detail: 'Worker DS-Retry re-establishing API stream with 2s delay.', workerName: 'Worker DS-Retry' },

];

const DEMO_COMMUNICATIONS: SupervisorCommunication[] = [
  { id: 'comm-1', timestamp: '00:02', sender: 'Supervisor AI', recipient: 'Worker DS-Alpha', message: 'TASK_ASSIGN: Scraping competitor pricing tiers CSV', type: 'sent' },
  { id: 'comm-2', timestamp: '00:03', sender: 'Worker DS-Alpha', recipient: 'Supervisor AI', message: 'ACK: Task accepted. Initializing Web Scraper #4.', type: 'accepted' },
  { id: 'comm-3', timestamp: '00:15', sender: 'Worker Finance-Beta', recipient: 'Supervisor AI', message: 'PROGRESS: 75% complete on EBITDA synthesis.', type: 'progress' },
  { id: 'comm-4', timestamp: '00:20', sender: 'Worker Ops-Delta', recipient: 'Supervisor AI', message: 'COMPLETE: Reserved 8 execution threads.', type: 'completed' },
  { id: 'comm-5', timestamp: '00:28', sender: 'Supervisor AI', recipient: 'Worker DS-Retry', message: 'RETRY_COMMAND: Backoff 5s and re-attempt API endpoint.', type: 'sent' },
];

const DEMO_METRICS: SupervisorMetrics = {
  runningTasks: 3,
  waitingTasks: 1,
  completedTasks: 1,
  failedTasks: 0,
  retryCount: 1,
  successRate: 94.5,
  workerUtilization: 78,
  queueSize: 6,
  avgDuration: '38s',
};

export const useSupervisorStore = create<SupervisorStore>()(
  devtools(
    persist(
      (set, get) => ({
        currentSession: null,
        historySessions: [],
        isOrchestratingActive: false,

        startOrchestration: (workflowId = 'WF-2026-9941') => {
          const newSession: SupervisorSession = {
            sessionId: `sup-sess-${Date.now()}`,
            workflowId,
            executionId: `EXEC-SUP-${Math.floor(1000 + Math.random() * 9000)}`,
            stage: 'monitoring',
            tasks: DEMO_TASKS,
            workers: DEMO_WORKERS,
            activities: DEMO_ACTIVITIES,
            communications: DEMO_COMMUNICATIONS,
            metrics: DEMO_METRICS,
            currentAction: 'Supervisor AI COO actively monitoring 5 worker execution streams...',
            currentStepIndex: 4,
            totalSteps: 7,
            overallProgress: 68,
            startTime: new Date().toISOString(),
            elapsedSeconds: 32,
            isPaused: false,
          };

          set({ currentSession: newSession, isOrchestratingActive: true });
        },

        pauseOrchestration: () => {
          const session = get().currentSession;
          if (session) {
            set({ currentSession: { ...session, isPaused: true } });
          }
        },

        resumeOrchestration: () => {
          const session = get().currentSession;
          if (session) {
            set({ currentSession: { ...session, isPaused: false } });
          }
        },

        resetOrchestration: () => {
          set({ currentSession: null, isOrchestratingActive: false });
        },

        tickTimer: () => {
          const session = get().currentSession;
          if (!session || session.isPaused || session.stage === 'completed') return;

          // Update elapsed seconds and simulate progress
          const updatedTasks = session.tasks.map((t) => {
            if (t.status === 'running') {
              const newProgress = Math.min(100, t.progressPercent + 2);
              const isDone = newProgress >= 100;
              return {
                ...t,
                progressPercent: newProgress,
                status: isDone ? ('completed' as const) : t.status,
              };
            }
            return t;
          });

          set({
            currentSession: {
              ...session,
              elapsedSeconds: session.elapsedSeconds + 1,
              tasks: updatedTasks,
            },
          });
        },

        stepForward: () => {
          const session = get().currentSession;
          if (!session || session.stage === 'completed') return;

          const stages: SupervisorStage[] = [
            'receiving_workflow',
            'parsing_workflow',
            'analyzing_tasks',
            'building_queue',
            'creating_workers',
            'assigning_tasks',
            'monitoring',
            'completed',
          ];

          const currentIndex = stages.indexOf(session.stage);
          const nextIndex = Math.min(currentIndex + 1, stages.length - 1);
          const nextStage = stages[nextIndex];

          const actions: Record<SupervisorStage, string> = {
            receiving_workflow: 'Receiving Boss Agent approved workflow payload...',
            parsing_workflow: 'Decomposing workflow into 6 department tasks & subtasks...',
            analyzing_tasks: 'Verifying dependency graph & resource bounds...',
            building_queue: 'Creating prioritized Execution Queue...',
            creating_workers: 'Dynamically spawning Worker Agent threads...',
            assigning_tasks: 'Dispatching tasks to Worker DS-Alpha, Finance-Beta, Legal-Gamma...',
            monitoring: 'Supervisor COO actively monitoring worker execution & metrics...',
            retrying: 'Executing automated exponential backoff retry...',
            waiting: 'Waiting for prerequisite task dependency resolution...',
            completed: 'All Worker Tasks Executed Successfully. Handoff Ready for Reports.',
          };

          set({
            currentSession: {
              ...session,
              stage: nextStage,
              currentAction: actions[nextStage],
              currentStepIndex: nextIndex + 1,
              overallProgress: Math.round(((nextIndex + 1) / stages.length) * 100),
            },
          });
        },

        retryTask: (taskId: string) => {
          const session = get().currentSession;
          if (!session) return;

          const updatedTasks = session.tasks.map((t) => {
            if (t.id === taskId) {
              return {
                ...t,
                status: 'running' as const,
                retryCount: t.retryCount + 1,
                errorReason: undefined,
                progressPercent: 20,
              };
            }
            return t;
          });

          const newActivity: SupervisorActivity = {
            id: `act-${Date.now()}`,
            timestamp: 'Just now',
            type: 'retry_started',
            title: `Task ${taskId} Retry Dispatched`,
            detail: `Manual retry command received from Supervisor Ops Dashboard.`,
            workerName: 'Supervisor COO',
          };

          set({
            currentSession: {
              ...session,
              tasks: updatedTasks,
              activities: [newActivity, ...session.activities],
              metrics: {
                ...session.metrics,
                retryCount: session.metrics.retryCount + 1,
              },
            },
          });
        },

        loadDemoSupervisorSession: () => {
          get().startOrchestration('WF-2026-9941');
        },
      }),
      {
        name: 'aegisos-supervisor-store',
        partialize: (state) => ({
          currentSession: state.currentSession,
        }),
      }
    ),
    { name: 'SupervisorStore' }
  )
);
