import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { type Node, type Edge } from '@xyflow/react';
import { Workflow, WorkflowExecution, WorkflowExecutionLog, WorkflowStatus } from '../types/workflow.types';

interface WorkflowState {
  workflows: Workflow[];
  activeWorkflow: Workflow | null;
  activeExecution: WorkflowExecution | null;
  executionLogs: Record<string, WorkflowExecutionLog[]>; // executionId -> logs
  isLoading: boolean;
  error: string | null;
}

interface WorkflowActions {
  setWorkflows: (workflows: Workflow[]) => void;
  setActiveWorkflow: (workflow: Workflow | null) => void;
  updateWorkflowNodes: (nodes: Node[] | ((nds: Node[]) => Node[])) => void;
  updateWorkflowEdges: (edges: Edge[] | ((eds: Edge[]) => Edge[])) => void;
  setActiveExecution: (execution: WorkflowExecution | null) => void;
  updateExecutionStatus: (executionId: string, status: Exclude<WorkflowStatus, 'draft' | 'active'>) => void;
  addExecutionLog: (executionId: string, log: WorkflowExecutionLog) => void;
  clearExecutionLogs: (executionId: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

type WorkflowStore = WorkflowState & WorkflowActions;

export const useWorkflowStore = create<WorkflowStore>()(
  devtools(
    (set) => ({
      workflows: [],
      activeWorkflow: null,
      activeExecution: null,
      executionLogs: {},
      isLoading: false,
      error: null,

      setWorkflows: (workflows) => set({ workflows }),
      setActiveWorkflow: (workflow) => set({ activeWorkflow: workflow }),
      updateWorkflowNodes: (nodes) =>
        set((state) => {
          if (!state.activeWorkflow) return {};
          const nextNodes = typeof nodes === 'function' ? nodes(state.activeWorkflow.nodes) : nodes;
          return {
            activeWorkflow: {
              ...state.activeWorkflow,
              nodes: nextNodes,
            },
          };
        }),
      updateWorkflowEdges: (edges) =>
        set((state) => {
          if (!state.activeWorkflow) return {};
          const nextEdges = typeof edges === 'function' ? edges(state.activeWorkflow.edges) : edges;
          return {
            activeWorkflow: {
              ...state.activeWorkflow,
              edges: nextEdges,
            },
          };
        }),
      setActiveExecution: (execution) => set({ activeExecution: execution }),
      updateExecutionStatus: (executionId, status) =>
        set((state) => {
          const nextExecution =
            state.activeExecution?.id === executionId
              ? { ...state.activeExecution, status }
              : state.activeExecution;
          return { activeExecution: nextExecution };
        }),
      addExecutionLog: (executionId, log) =>
        set((state) => {
          const currentLogs = state.executionLogs[executionId] || [];
          return {
            executionLogs: {
              ...state.executionLogs,
              [executionId]: [...currentLogs, log],
            },
          };
        }),
      clearExecutionLogs: (executionId) =>
        set((state) => {
          const nextLogs = { ...state.executionLogs };
          delete nextLogs[executionId];
          return { executionLogs: nextLogs };
        }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
    }),
    { name: 'WorkflowStore' }
  )
);
