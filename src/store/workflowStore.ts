import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Node, Edge } from '@xyflow/react';
import {
  WorkflowNodeData,
  WorkflowNodeStatus,
  SystemHealthItem,
  LiveEventItem,
  AgentCommunicationPacket,
  WorkflowReplayState,
} from '../types/workflow.types';


interface WorkflowState {
  nodes: Node<WorkflowNodeData>[];
  edges: Edge[];
  selectedNodeId: string | null;
  systemHealth: SystemHealthItem[];
  liveEvents: LiveEventItem[];
  communications: AgentCommunicationPacket[];
  replayState: WorkflowReplayState;
  filterDepartment: string;
  filterStatus: string;
  isSocketConnected: boolean;
  socketLatencyMs: number;
}

interface WorkflowActions {
  setSelectedNodeId: (id: string | null) => void;
  setFilterDepartment: (dept: string) => void;
  setFilterStatus: (status: string) => void;
  toggleReplayPlay: () => void;
  setReplaySpeed: (speed: 1 | 2 | 4) => void;
  setReplayProgress: (progress: number) => void;
  updateExecutionStatus: (id: string, status: WorkflowNodeStatus) => void;
  addExecutionLog: (id: string, log: unknown) => void;

  tickTimer: () => void;


  loadDemoWorkflowCanvas: () => void;
}

type WorkflowStore = WorkflowState & WorkflowActions;

const DEMO_NODES: Node<WorkflowNodeData>[] = [
  {
    id: 'node-boss-ceo',
    type: 'bossNode',
    position: { x: 450, y: 50 },
    data: {
      id: 'node-boss-ceo',
      label: 'Boss Agent CEO',
      nodeType: 'boss',
      status: 'completed',
      progress: 100,
      health: 'healthy',
      latencyMs: 14,
      currentStep: 'Strategy Approved & Handed Off to Supervisor AI',
      assignedTaskName: 'Strategic Intent Parsing & Multi-Department Execution Plan',
      metrics: { cpuUsage: 24, memoryUsage: '420 MB', tokensUsed: 124500 },
      logs: [
        { timestamp: '10:40:00 AM', message: 'Received user intent for Q4 Business Audit.' },
        { timestamp: '10:40:25 AM', message: 'Extracted goals across Finance, Data Science, Legal, Ops, Marketing.' },
        { timestamp: '10:40:40 AM', message: 'Execution Blueprint Approved. Handoff sent to Supervisor COO.' },
      ],
    },
  },
  {
    id: 'node-sup-coo',
    type: 'supervisorNode',
    position: { x: 450, y: 220 },
    data: {
      id: 'node-sup-coo',
      label: 'Supervisor AI COO',
      nodeType: 'supervisor',
      status: 'running',
      progress: 78,
      health: 'busy',
      latencyMs: 18,
      currentStep: 'Monitoring 5 Active Worker Thread Streams',
      assignedTaskName: 'DAG Task Breakdown & Worker Thread Allocation',
      metrics: { cpuUsage: 45, memoryUsage: '380 MB', tokensUsed: 89000 },
      subtasks: [
        { id: 'st-1', title: 'Decompose Boss Workflow into 6 Tasks', status: 'completed' },
        { id: 'st-2', title: 'Spawn Worker DS-Alpha, Finance-Beta, Legal-Gamma', status: 'completed' },
        { id: 'st-3', title: 'Monitor Scraper & EBITDA Execution', status: 'running' },
      ],
      logs: [
        { timestamp: '10:41:00 AM', message: 'Supervisor AI received Boss Approved Workflow.' },
        { timestamp: '10:41:05 AM', message: 'Allocated 5 worker nodes in dynamic thread pool.' },
        { timestamp: '10:41:30 AM', message: 'Monitoring worker progress & inter-agent communication.' },
      ],
    },
  },
  {
    id: 'node-worker-ds',
    type: 'workerNode',
    position: { x: 100, y: 420 },
    data: {
      id: 'node-worker-ds',
      label: 'Worker DS-Alpha',
      nodeType: 'worker',
      status: 'running',
      department: 'Data Science',
      progress: 72,
      health: 'busy',
      latencyMs: 28,
      assignedTaskName: 'Competitor Price Scraping & Feature Matrix',
      currentStep: 'Parsing Competitor Tier Table CSV',
      metrics: { cpuUsage: 48, memoryUsage: '284 MB', tokensUsed: 24500 },
    },
  },
  {
    id: 'node-worker-fin',
    type: 'workerNode',
    position: { x: 350, y: 420 },
    data: {
      id: 'node-worker-fin',
      label: 'Worker Finance-Beta',
      nodeType: 'worker',
      status: 'running',
      department: 'Finance',
      progress: 85,
      health: 'healthy',
      latencyMs: 22,
      assignedTaskName: 'Q4 EBITDA & Income Statement Audit',
      currentStep: 'Calculating YoY Margin Expansion Delta',
      metrics: { cpuUsage: 35, memoryUsage: '312 MB', tokensUsed: 38200 },
    },
  },
  {
    id: 'node-worker-ops',
    type: 'workerNode',
    position: { x: 600, y: 420 },
    data: {
      id: 'node-worker-ops',
      label: 'Worker Ops-Delta',
      nodeType: 'worker',
      status: 'completed',
      department: 'Operations',
      progress: 100,
      health: 'healthy',
      latencyMs: 12,
      assignedTaskName: 'Thread Pool Scaling & Rate Limiting',
      currentStep: 'Reserved 8 Worker Threads',
      metrics: { cpuUsage: 12, memoryUsage: '180 MB', tokensUsed: 4500 },
    },
  },
  {
    id: 'node-worker-leg',
    type: 'workerNode',
    position: { x: 850, y: 420 },
    data: {
      id: 'node-worker-leg',
      label: 'Worker Legal-Gamma',
      nodeType: 'worker',
      status: 'waiting',
      department: 'Legal',
      progress: 0,
      health: 'idle',
      latencyMs: 15,
      assignedTaskName: 'Legal Policy & Compliance Audit',
      currentStep: 'Awaiting Finance task completion',
      metrics: { cpuUsage: 4, memoryUsage: '110 MB', tokensUsed: 0 },
    },
  },
  {
    id: 'node-validation',
    type: 'validationNode',
    position: { x: 350, y: 620 },
    data: {
      id: 'node-validation',
      label: '7-Point Validation Engine',
      nodeType: 'validation',
      status: 'running',
      progress: 80,
      health: 'healthy',
      latencyMs: 8,
      currentStep: 'Running Integrity Checks across Outputs',
      assignedTaskName: 'Integrity Assertion & Safety Limit Check',
      metrics: { cpuUsage: 15, memoryUsage: '140 MB', tokensUsed: 1200 },
    },
  },
  {
    id: 'node-report',
    type: 'reportNode',
    position: { x: 600, y: 620 },
    data: {
      id: 'node-report',
      label: 'Executive PDF Deliverable',
      nodeType: 'report',
      status: 'waiting',
      progress: 0,
      health: 'idle',
      latencyMs: 5,
      currentStep: 'Awaiting Validation completion',
      assignedTaskName: 'PDF Executive Report Aggregation',
      metrics: { cpuUsage: 0, memoryUsage: '80 MB', tokensUsed: 0 },
    },
  },
];

const DEMO_EDGES: Edge[] = [
  { id: 'edge-boss-sup', source: 'node-boss-ceo', target: 'node-sup-coo', animated: true, type: 'animatedFlowEdge', data: { edgeType: 'task_assignment', label: 'Approved Strategy Payload' } },
  { id: 'edge-sup-ds', source: 'node-sup-coo', target: 'node-worker-ds', animated: true, type: 'animatedFlowEdge', data: { edgeType: 'task_assignment', label: 'Competitor Scrape Task' } },
  { id: 'edge-sup-fin', source: 'node-sup-coo', target: 'node-worker-fin', animated: true, type: 'animatedFlowEdge', data: { edgeType: 'task_assignment', label: 'Finance Audit Task' } },
  { id: 'edge-sup-ops', source: 'node-sup-coo', target: 'node-worker-ops', animated: false, type: 'animatedFlowEdge', data: { edgeType: 'completion', label: 'Ops Scaled' } },
  { id: 'edge-sup-leg', source: 'node-sup-coo', target: 'node-worker-leg', animated: false, type: 'animatedFlowEdge', data: { edgeType: 'dependency', label: 'Governance Check' } },
  { id: 'edge-fin-val', source: 'node-worker-fin', target: 'node-validation', animated: true, type: 'animatedFlowEdge', data: { edgeType: 'data_flow', label: 'Financial Audit Stream' } },
  { id: 'edge-ds-val', source: 'node-worker-ds', target: 'node-validation', animated: true, type: 'animatedFlowEdge', data: { edgeType: 'data_flow', label: 'Scraped Dataset Stream' } },
  { id: 'edge-val-rep', source: 'node-validation', target: 'node-report', animated: false, type: 'animatedFlowEdge', data: { edgeType: 'completion', label: 'Validated PDF Payload' } },
];

const DEMO_SYSTEM_HEALTH: SystemHealthItem[] = [
  { id: 'h-1', name: 'Boss Agent CEO Engine', type: 'boss', status: 'green', latencyMs: 14, message: 'Reasoning pipeline operational at 98.4% accuracy' },
  { id: 'h-2', name: 'Supervisor AI Operations', type: 'supervisor', status: 'green', latencyMs: 18, message: 'Monitoring 5 worker execution streams' },
  { id: 'h-3', name: 'Dynamic Worker Pool', type: 'workers', status: 'green', latencyMs: 24, message: '8 worker threads allocated cleanly' },
  { id: 'h-4', name: 'Internal Finance DB', type: 'database', status: 'green', latencyMs: 8, message: 'PostgreSQL connection healthy (8ms)' },
  { id: 'h-5', name: 'WebSocket Event Stream', type: 'socket', status: 'green', latencyMs: 12, message: 'Real-time socket stream connected' },
  { id: 'h-6', name: 'Gemini AI API Engine', type: 'gemini', status: 'green', latencyMs: 145, message: 'Gemini Flash API latency nominal' },
];

const DEMO_LIVE_EVENTS: LiveEventItem[] = [
  { id: 'evt-1', timestamp: '10:42:15 AM', type: 'node_created', title: 'Worker DS-Alpha Spawned', detail: 'Dynamic worker created for Competitor Scrape task.' },
  { id: 'evt-2', timestamp: '10:42:18 AM', type: 'task_started', title: 'Financial Audit In-Progress', detail: 'Worker Finance-Beta queried Q4 ledger accounts.' },
  { id: 'evt-3', timestamp: '10:42:25 AM', type: 'message_sent', title: 'Inter-Agent Comm Sent', detail: 'Supervisor AI dispatched progress update to Boss CEO.' },
  { id: 'evt-4', timestamp: '10:42:30 AM', type: 'validation_passed', title: '7-Point Validation Running', detail: 'Validation engine verifying mathematical consistency.' },
];

const DEMO_COMMUNICATIONS: AgentCommunicationPacket[] = [
  { id: 'pkt-1', timestamp: '10:42:15 AM', senderId: 'node-boss-ceo', senderName: 'Boss CEO', recipientId: 'node-sup-coo', recipientName: 'Supervisor COO', message: 'STRATEGY_DISPATCH: Q4 Performance Audit plan ready.', priority: 'critical', status: 'received' },
  { id: 'pkt-2', timestamp: '10:42:18 AM', senderId: 'node-sup-coo', senderName: 'Supervisor COO', recipientId: 'node-worker-ds', recipientName: 'Worker DS-Alpha', message: 'TASK_ASSIGN: Scrape pricing packages CSV.', priority: 'high', status: 'processing' },
  { id: 'pkt-3', timestamp: '10:42:25 AM', senderId: 'node-worker-fin', senderName: 'Worker Finance-Beta', recipientId: 'node-validation', recipientName: 'Validation Engine', message: 'DATA_STREAM: EBITDA margin variance dataset payload.', priority: 'high', status: 'sent' },
];

export const useWorkflowStore = create<WorkflowStore>()(
  devtools(
    persist(
      (set, get) => ({
        nodes: DEMO_NODES,
        edges: DEMO_EDGES,
        selectedNodeId: null,
        systemHealth: DEMO_SYSTEM_HEALTH,
        liveEvents: DEMO_LIVE_EVENTS,
        communications: DEMO_COMMUNICATIONS,
        replayState: {
          isPlaying: false,
          speed: 1,
          currentStepIndex: 4,
          totalSteps: 8,
          scrubProgress: 50,
        },
        filterDepartment: 'All',
        filterStatus: 'All',
        isSocketConnected: true,
        socketLatencyMs: 12,

        setSelectedNodeId: (id) => set({ selectedNodeId: id }),
        setFilterDepartment: (dept) => set({ filterDepartment: dept }),
        setFilterStatus: (status) => set({ filterStatus: status }),

        toggleReplayPlay: () => {
          const rs = get().replayState;
          set({ replayState: { ...rs, isPlaying: !rs.isPlaying } });
        },

        setReplaySpeed: (speed) => {
          const rs = get().replayState;
          set({ replayState: { ...rs, speed } });
        },

        setReplayProgress: (progress) => {
          const rs = get().replayState;
          const currentStep = Math.round((progress / 100) * rs.totalSteps);
          set({ replayState: { ...rs, scrubProgress: progress, currentStepIndex: currentStep } });
        },

        updateExecutionStatus: (id, status) => {
          const { nodes } = get();
          const updatedNodes = nodes.map((node) => {
            if (node.id === id) {
              return {
                ...node,
                data: {
                  ...node.data,
                  status,
                },
              };
            }
            return node;
          });
          set({ nodes: updatedNodes });
        },

        addExecutionLog: (id, log) => {
          const { nodes } = get();
          const updatedNodes = nodes.map((node) => {
            if (node.id === id) {
              const existingLogs = node.data.logs || [];
              const formattedLog: { timestamp: string; message: string } =
                typeof log === 'string'
                  ? { timestamp: new Date().toLocaleTimeString(), message: log }
                  : typeof log === 'object' && log !== null && 'message' in log
                  ? { timestamp: (log as Record<string, unknown>).timestamp ? String((log as Record<string, unknown>).timestamp) : new Date().toLocaleTimeString(), message: String((log as Record<string, unknown>).message) }

                  : { timestamp: new Date().toLocaleTimeString(), message: String(log) };

              return {
                ...node,
                data: {
                  ...node.data,
                  logs: [...existingLogs, formattedLog],
                },
              };
            }
            return node;
          });
          set({ nodes: updatedNodes });
        },




        tickTimer: () => {
          const { nodes, replayState } = get();

          // Advance running node progress %
          const updatedNodes = nodes.map((node) => {
            if (node.data.status === 'running') {
              const newProg = Math.min(100, node.data.progress + 2);
              const isDone = newProg >= 100;
              return {
                ...node,
                data: {
                  ...node.data,
                  progress: newProg,
                  status: isDone ? ('completed' as const) : node.data.status,
                },
              };
            }
            return node;
          });

          // Advance replay player if active
          if (replayState.isPlaying) {
            const nextProg = (replayState.scrubProgress + 2 * replayState.speed) % 100;
            set({
              replayState: {
                ...replayState,
                scrubProgress: nextProg,
                currentStepIndex: Math.round((nextProg / 100) * replayState.totalSteps),
              },
            });
          }

          set({ nodes: updatedNodes });
        },

        loadDemoWorkflowCanvas: () => {
          set({
            nodes: DEMO_NODES,
            edges: DEMO_EDGES,
            systemHealth: DEMO_SYSTEM_HEALTH,
            liveEvents: DEMO_LIVE_EVENTS,
            communications: DEMO_COMMUNICATIONS,
          });
        },
      }),
      {
        name: 'aegisos-workflow-store',
        partialize: (state) => ({
          filterDepartment: state.filterDepartment,
          filterStatus: state.filterStatus,
        }),
      }
    ),
    { name: 'WorkflowStore' }
  )
);
