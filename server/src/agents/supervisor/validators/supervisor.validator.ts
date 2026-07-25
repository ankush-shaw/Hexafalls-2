import { z } from 'zod';

export const startExecutionSchema = z.object({
  workflowId: z.string().min(1, 'Workflow ID is required.'),
  executionMode: z.enum(['sequential', 'parallel', 'mixed', 'conditional']).optional().default('mixed'),
});

export const retryTaskSchema = z.object({
  executionId: z.string().min(1, 'Execution ID is required.'),
  taskId: z.string().min(1, 'Task ID is required.'),
});

export const cancelExecutionSchema = z.object({
  executionId: z.string().min(1, 'Execution ID is required.'),
  reason: z.string().optional(),
});

export type StartExecutionInput = z.infer<typeof startExecutionSchema>;
export type RetryTaskInput = z.infer<typeof retryTaskSchema>;
export type CancelExecutionInput = z.infer<typeof cancelExecutionSchema>;
