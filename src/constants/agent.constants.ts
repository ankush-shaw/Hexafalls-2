export const AGENT_ROLES = {
  BOSS: 'boss',
  SUPERVISOR: 'supervisor',
  WORKER: 'worker',
} as const;

export const AGENT_STATUSES = {
  IDLE: 'idle',
  RUNNING: 'running',
  PAUSED: 'paused',
  FAILED: 'failed',
  OFFLINE: 'offline',
} as const;

export const LLM_MODELS = [
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', provider: 'Google' },
  { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', provider: 'Google' },
  { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic' },
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI' },
  { id: 'llama-3.1-70b', name: 'Llama 3.1 70B', provider: 'Meta' },
] as const;

export const DEFAULT_AGENT_METRICS = {
  tasksCompleted: 0,
  accuracyRate: 100,
  avgResponseTimeMs: 0,
  cpuUsage: 0,
  memoryUsage: 0,
};
