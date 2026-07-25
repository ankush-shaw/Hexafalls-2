import { z } from 'zod';

export const createWorkflowEngineSchema = z.object({
  bossWorkflowId: z.string().min(1, 'Boss Workflow ID is required.'),
  conversationId: z.string().min(1, 'Conversation ID is required.'),
  name: z.string().optional().default('AI Engine Execution'),
  priority: z.number().optional().default(5),
  executionStrategy: z.enum(['sequential', 'parallel', 'mixed', 'conditional']).optional().default('mixed'),
});

export const startWorkflowEngineSchema = z.object({
  engineWorkflowId: z.string().min(1, 'Engine Workflow ID is required.'),
});

export const workflowActionSchema = z.object({
  engineWorkflowId: z.string().min(1, 'Engine Workflow ID is required.'),
  reason: z.string().optional(),
});

export type CreateWorkflowEngineInput = z.infer<typeof createWorkflowEngineSchema>;
export type StartWorkflowEngineInput = z.infer<typeof startWorkflowEngineSchema>;
export type WorkflowActionInput = z.infer<typeof workflowActionSchema>;
