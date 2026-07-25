import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  WorkerAgent,
  WorkerDepartment,
  WorkerState,
  WorkerMessage,
} from '../types/worker.types';


interface WorkerStateStore {
  workers: WorkerAgent[];
  selectedWorkerId: string | null;
  searchQuery: string;
  departmentFilter: WorkerDepartment | 'All';
  statusFilter: WorkerState | 'All';
  messages: WorkerMessage[];
  isSimulationActive: boolean;
}

interface WorkerActions {
  setSelectedWorkerId: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  setDepartmentFilter: (dept: WorkerDepartment | 'All') => void;
  setStatusFilter: (status: WorkerState | 'All') => void;
  retryWorkerTask: (workerId: string) => void;
  cancelWorkerTask: (workerId: string) => void;
  tickTimer: () => void;
  loadDemoWorkerPool: () => void;
}

type WorkerStore = WorkerStateStore & WorkerActions;

const DEMO_WORKERS: WorkerAgent[] = [
  {
    id: 'worker-ds-01',
    name: 'Worker DS-Alpha',
    department: 'Data Science',
    avatarColor: 'from-purple-500 to-indigo-600',
    status: 'running',
    health: 'busy',
    assignedTaskName: 'Competitor Price Scraping & Feature Extraction',
    assignedTaskId: 'task-101',
    currentStep: 'Parsing Competitor Tier Table CSV',
    progress: 72,
    confidence: 96,
    queuePosition: 1,
    startedAt: '10:42:15 AM',
    elapsedTime: '00:32',
    estimatedDuration: '45s',
    subtasks: [
      { id: 'sub-1', title: 'Initialize Web Scraper Worker Node #4', status: 'completed', duration: '5s', progressPercent: 100 },
      { id: 'sub-2', title: 'Scrape Pricing Packages & Feature Matrix', status: 'running', duration: '20s', progressPercent: 72 },
      { id: 'sub-3', title: 'Format CSV Dataset Output', status: 'waiting', duration: '10s', progressPercent: 0 },
    ],
    logs: [
      { id: 'log-1', timestamp: '10:42:15 AM', level: 'info', message: 'Worker DS-Alpha initialized by Supervisor AI COO.', step: 'Initialize' },
      { id: 'log-2', timestamp: '10:42:18 AM', level: 'info', message: 'Scraper thread #4 established HTTP connection to 3 competitor endpoints.', step: 'Scrape' },
      { id: 'log-3', timestamp: '10:42:28 AM', level: 'success', message: 'Extracted 14 core pricing tiers across competitor platforms.', step: 'Scrape' },
    ],
    metrics: {
      cpuUsage: 48,
      memoryUsage: '284 MB',
      executionTime: '00:32',
      completionPercent: 72,
      avgSpeed: '1.4 MB/s',
      tokensUsed: 24500,
      apiRequests: 18,
    },
    retryCount: 0,
  },
  {
    id: 'worker-fin-01',
    name: 'Worker Finance-Beta',
    department: 'Finance',
    avatarColor: 'from-emerald-500 to-teal-600',
    status: 'running',
    health: 'healthy',
    assignedTaskName: 'Q4 EBITDA & Income Statement Audit',
    assignedTaskId: 'task-102',
    currentStep: 'Calculating YoY Margin Expansion Delta',
    progress: 85,
    confidence: 98,
    queuePosition: 2,
    startedAt: '10:41:50 AM',
    elapsedTime: '00:55',
    estimatedDuration: '1m 15s',
    subtasks: [
      { id: 'sub-4', title: 'Query Internal Finance Database API', status: 'completed', duration: '12s', progressPercent: 100 },
      { id: 'sub-5', title: 'Synthesize Income Statement Line Items', status: 'completed', duration: '25s', progressPercent: 100 },
      { id: 'sub-6', title: 'Calculate YoY EBITDA Margin Expansion', status: 'running', duration: '18s', progressPercent: 70 },
    ],
    logs: [
      { id: 'log-4', timestamp: '10:41:50 AM', level: 'info', message: 'Worker Finance-Beta initialized and connected to Finance DB.', step: 'Query' },
      { id: 'log-5', timestamp: '10:42:10 AM', level: 'success', message: 'Financial ledger items parsed with 0 mathematical variance.', step: 'Audit' },
    ],
    metrics: {
      cpuUsage: 35,
      memoryUsage: '312 MB',
      executionTime: '00:55',
      completionPercent: 85,
      avgSpeed: '3.2 req/s',
      tokensUsed: 38200,
      apiRequests: 24,
    },
    retryCount: 0,
  },
  {
    id: 'worker-leg-01',
    name: 'Worker Legal-Gamma',
    department: 'Legal',
    avatarColor: 'from-amber-500 to-orange-600',
    status: 'waiting',
    health: 'idle',
    assignedTaskName: 'Legal Policy & Compliance Audit',
    assignedTaskId: 'task-103',
    currentStep: 'Awaiting Finance task completion',
    progress: 0,
    confidence: 99,
    queuePosition: 3,
    startedAt: 'Awaiting start',
    elapsedTime: '00:00',
    estimatedDuration: '30s',
    subtasks: [
      { id: 'sub-7', title: 'Verify Corporate Governance Rules', status: 'waiting', duration: '10s', progressPercent: 0 },
      { id: 'sub-8', title: 'Audit External Data Export Compliance', status: 'waiting', duration: '15s', progressPercent: 0 },
    ],
    logs: [
      { id: 'log-6', timestamp: '10:42:00 AM', level: 'info', message: 'Worker Legal-Gamma spawned and queued in thread pool.', step: 'Queue' },
    ],
    metrics: {
      cpuUsage: 4,
      memoryUsage: '110 MB',
      executionTime: '00:00',
      completionPercent: 0,
      avgSpeed: '0 req/s',
      tokensUsed: 0,
      apiRequests: 0,
    },
    retryCount: 0,
  },
  {
    id: 'worker-ops-01',
    name: 'Worker Ops-Delta',
    department: 'Operations',
    avatarColor: 'from-sky-500 to-blue-600',
    status: 'completed',
    health: 'healthy',
    assignedTaskName: 'Thread Pool Scaling & Rate Limiting',
    assignedTaskId: 'task-104',
    currentStep: 'Reserved 8 Worker Threads',
    progress: 100,
    confidence: 99,
    queuePosition: 0,
    startedAt: '10:41:00 AM',
    elapsedTime: '00:15',
    estimatedDuration: '15s',
    subtasks: [
      { id: 'sub-9', title: 'Allocate 8 Execution Threads', status: 'completed', duration: '5s', progressPercent: 100 },
      { id: 'sub-10', title: 'Configure API Rate-Limiter Bounds', status: 'completed', duration: '10s', progressPercent: 100 },
    ],
    logs: [
      { id: 'log-7', timestamp: '10:41:00 AM', level: 'info', message: 'Worker Ops-Delta spawned for resource allocation.', step: 'Alloc' },
      { id: 'log-8', timestamp: '10:41:15 AM', level: 'success', message: 'Successfully allocated 8 concurrent worker threads.', step: 'Complete' },
    ],
    metrics: {
      cpuUsage: 12,
      memoryUsage: '180 MB',
      executionTime: '00:15',
      completionPercent: 100,
      avgSpeed: '10 threads/s',
      tokensUsed: 4500,
      apiRequests: 6,
    },
    result: {
      id: 'res-104',
      taskId: 'task-104',
      outputSummary: 'Operations thread pool scaled up to 8 active worker nodes. Rate limiting configured to 15 req/s.',
      executionTime: '00:15',
      confidenceScore: 99,
      completedAt: '10:41:15 AM',
      keyOutputs: ['8 Threads Reserved', '15 req/s Rate-Limit', 'Zero Lock Deadlocks'],
    },
    retryCount: 0,
  },
  {
    id: 'worker-mktg-01',
    name: 'Worker Mktg-Epsilon',
    department: 'Marketing',
    avatarColor: 'from-pink-500 to-rose-600',
    status: 'paused',
    health: 'idle',
    assignedTaskName: 'Competitor Positioning Strategy',
    assignedTaskId: 'task-105',
    currentStep: 'Blocked on Data Science task-101 output',
    progress: 0,
    confidence: 92,
    queuePosition: 4,
    startedAt: 'Awaiting dependency',
    elapsedTime: '00:00',
    estimatedDuration: '40s',
    subtasks: [
      { id: 'sub-11', title: 'Aggregate Competitor Pricing Tiers', status: 'waiting', duration: '20s', progressPercent: 0 },
      { id: 'sub-12', title: 'Draft Executive Strategy Positioning Deck', status: 'waiting', duration: '20s', progressPercent: 0 },
    ],
    logs: [
      { id: 'log-9', timestamp: '10:42:05 AM', level: 'warn', message: 'Worker Mktg-Epsilon waiting for task-101 competitor CSV deliverable.', step: 'Wait' },
    ],
    metrics: {
      cpuUsage: 2,
      memoryUsage: '95 MB',
      executionTime: '00:00',
      completionPercent: 0,
      avgSpeed: '0 req/s',
      tokensUsed: 0,
      apiRequests: 0,
    },
    retryCount: 0,
  },
  {
    id: 'worker-ds-02',
    name: 'Worker DS-Retry',
    department: 'Data Science',
    avatarColor: 'from-rose-500 to-red-600',
    status: 'retrying',
    health: 'overloaded',
    assignedTaskName: 'Scraper Endpoint Re-connection',
    assignedTaskId: 'task-106',
    currentStep: 'Backoff Retry #1 Executing in 5s',
    progress: 35,
    confidence: 88,
    queuePosition: 5,
    startedAt: '10:42:10 AM',
    elapsedTime: '00:20',
    estimatedDuration: '25s',
    subtasks: [
      { id: 'sub-13', title: 'Re-establish API Endpoint Connection', status: 'running', duration: '10s', progressPercent: 35 },
    ],
    logs: [
      { id: 'log-10', timestamp: '10:42:10 AM', level: 'error', message: 'HTTP 429 Rate Limit Throttled on 3rd party endpoint.', step: 'Error' },
      { id: 'log-11', timestamp: '10:42:12 AM', level: 'info', message: 'Supervisor AI initiated automatic retry attempt #1 with exponential backoff.', step: 'Retry' },
    ],
    metrics: {
      cpuUsage: 82,
      memoryUsage: '340 MB',
      executionTime: '00:20',
      completionPercent: 35,
      avgSpeed: '0.2 req/s',
      tokensUsed: 12000,
      apiRequests: 14,
    },
    errorReason: 'HTTP 429 Rate Limit Throttled — Retrying in 5s',
    retryCount: 1,
  },
];

const DEMO_MESSAGES: WorkerMessage[] = [
  { id: 'msg-1', timestamp: '10:42:15 AM', senderId: 'Supervisor AI', senderName: 'Supervisor COO', recipientId: 'worker-ds-01', recipientName: 'Worker DS-Alpha', type: 'task_assigned', content: 'DISPATCH: Execute competitor price scraping CSV task.' },
  { id: 'msg-2', timestamp: '10:42:16 AM', senderId: 'worker-ds-01', senderName: 'Worker DS-Alpha', recipientId: 'Supervisor AI', recipientName: 'Supervisor COO', type: 'task_finished', content: 'ACK: Task accepted. Scraper thread #4 active.' },
  { id: 'msg-3', timestamp: '10:42:20 AM', senderId: 'worker-fin-01', senderName: 'Worker Finance-Beta', recipientId: 'Supervisor AI', recipientName: 'Supervisor COO', type: 'need_info', content: 'UPDATE: Financial ledger query complete. Synthesizing margin expansion.' },
  { id: 'msg-4', timestamp: '10:42:28 AM', senderId: 'worker-ds-02', senderName: 'Worker DS-Retry', recipientId: 'Supervisor AI', recipientName: 'Supervisor COO', type: 'retry_requested', content: 'RETRY_ALERT: HTTP 429 error encountered. Requesting exponential backoff.' },
];

export const useWorkerStore = create<WorkerStore>()(
  devtools(
    persist(
      (set, get) => ({
        workers: DEMO_WORKERS,
        selectedWorkerId: null,
        searchQuery: '',
        departmentFilter: 'All',
        statusFilter: 'All',
        messages: DEMO_MESSAGES,
        isSimulationActive: true,

        setSelectedWorkerId: (id) => set({ selectedWorkerId: id }),
        setSearchQuery: (query) => set({ searchQuery: query }),
        setDepartmentFilter: (dept) => set({ departmentFilter: dept }),
        setStatusFilter: (status) => set({ statusFilter: status }),

        retryWorkerTask: (workerId) => {
          const { workers } = get();
          const updatedWorkers = workers.map((w) => {
            if (w.id === workerId) {
              return {
                ...w,
                status: 'running' as const,
                health: 'healthy' as const,
                retryCount: w.retryCount + 1,
                errorReason: undefined,
                progress: Math.min(100, w.progress + 15),
              };
            }
            return w;
          });
          set({ workers: updatedWorkers });
        },

        cancelWorkerTask: (workerId) => {
          const { workers } = get();
          const updatedWorkers = workers.map((w) => {
            if (w.id === workerId) {
              return {
                ...w,
                status: 'cancelled' as const,
                health: 'idle' as const,
                currentStep: 'Task cancelled by user',
              };
            }
            return w;
          });
          set({ workers: updatedWorkers });
        },

        tickTimer: () => {
          const { workers } = get();
          const updatedWorkers = workers.map((w) => {
            if (w.status === 'running') {
              const newProgress = Math.min(100, w.progress + 2);
              const isComplete = newProgress >= 100;
              return {
                ...w,
                progress: newProgress,
                status: isComplete ? ('completed' as const) : w.status,
                health: isComplete ? ('healthy' as const) : w.health,
                result: isComplete
                  ? {
                      id: `res-${w.id}`,
                      taskId: w.assignedTaskId,
                      outputSummary: `Worker ${w.name} successfully finalized task: ${w.assignedTaskName}.`,
                      executionTime: w.elapsedTime,
                      confidenceScore: w.confidence,
                      completedAt: new Date().toLocaleTimeString(),
                      keyOutputs: ['Deliverable Validated', 'Zero Errors', 'Returned to Supervisor'],
                    }
                  : w.result,
              };
            }
            return w;
          });
          set({ workers: updatedWorkers });
        },

        loadDemoWorkerPool: () => {
          set({ workers: DEMO_WORKERS, messages: DEMO_MESSAGES });
        },
      }),
      {
        name: 'aegisos-worker-store',
        partialize: (state) => ({
          workers: state.workers,
        }),
      }
    ),
    { name: 'WorkerStore' }
  )
);
