import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { BossAgent, SupervisorAgent, WorkerAgent, AgentStatus, AgentMetric } from '../types/agent.types';

interface AgentState {
  bossAgent: BossAgent | null;
  supervisors: SupervisorAgent[];
  workers: WorkerAgent[];
  isLoading: boolean;
  error: string | null;
}

interface AgentActions {
  setBossAgent: (boss: BossAgent | null) => void;
  setSupervisors: (supervisors: SupervisorAgent[]) => void;
  setWorkers: (workers: WorkerAgent[]) => void;
  updateAgentStatus: (agentId: string, status: AgentStatus) => void;
  updateAgentMetrics: (agentId: string, metrics: Partial<AgentMetric>) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

type AgentStore = AgentState & AgentActions;

export const useAgentStore = create<AgentStore>()(
  devtools(
    (set) => ({
      bossAgent: null,
      supervisors: [],
      workers: [],
      isLoading: false,
      error: null,

      setBossAgent: (bossAgent) => set({ bossAgent }),
      setSupervisors: (supervisors) => set({ supervisors }),
      setWorkers: (workers) => set({ workers }),
      updateAgentStatus: (agentId, status) =>
        set((state) => {
          if (state.bossAgent?.id === agentId) {
            return { bossAgent: { ...state.bossAgent, status } };
          }
          
          const isSupervisor = state.supervisors.some(s => s.id === agentId);
          if (isSupervisor) {
            return {
              supervisors: state.supervisors.map(s =>
                s.id === agentId ? { ...s, status } : s
              ),
            };
          }

          return {
            workers: state.workers.map(w =>
              w.id === agentId ? { ...w, status } : w
            ),
          };
        }),
      updateAgentMetrics: (agentId, metrics) =>
        set((state) => {
          if (state.bossAgent?.id === agentId) {
            return {
              bossAgent: {
                ...state.bossAgent,
                metrics: { ...state.bossAgent.metrics, ...metrics },
              },
            };
          }

          const isSupervisor = state.supervisors.some(s => s.id === agentId);
          if (isSupervisor) {
            return {
              supervisors: state.supervisors.map(s =>
                s.id === agentId ? { ...s, metrics: { ...s.metrics, ...metrics } } : s
              ),
            };
          }

          return {
            workers: state.workers.map(w =>
              w.id === agentId ? { ...w, metrics: { ...w.metrics, ...metrics } } : w
            ),
          };
        }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
    }),
    { name: 'AgentStore' }
  )
);
