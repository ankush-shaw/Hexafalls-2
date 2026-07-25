import { z } from 'zod';

export const createWorkerSchema = z.object({
  executionId: z.string().min(1, 'Execution ID is required.'),
  department: z.string().min(1, 'Department is required.'),
  capabilities: z.array(z.string()).optional(),
  priority: z.number().optional().default(5),
});

export const startWorkerTaskSchema = z.object({
  workerId: z.string().min(1, 'Worker ID is required.'),
  taskId: z.string().min(1, 'Task ID is required.'),
  workflowId: z.string().min(1, 'Workflow ID is required.'),
  executionId: z.string().min(1, 'Execution ID is required.'),
  taskName: z.string().min(1),
  department: z.string().min(1),
  description: z.string().optional().default(''),
  dependencies: z.array(z.string()).optional().default([]),
  requiredOutput: z.string().optional().default('Structured Output Payload'),
  payload: z.record(z.unknown()).optional(),
});

export const stopWorkerSchema = z.object({
  workerId: z.string().min(1, 'Worker ID is required.'),
  reason: z.string().optional(),
});

export const retryWorkerTaskSchema = z.object({
  workerId: z.string().min(1, 'Worker ID is required.'),
  taskId: z.string().min(1, 'Task ID is required.'),
});

export type CreateWorkerInput = z.infer<typeof createWorkerSchema>;
export type StartWorkerTaskInput = z.infer<typeof startWorkerTaskSchema>;
export type StopWorkerInput = z.infer<typeof stopWorkerSchema>;
export type RetryWorkerTaskInput = z.infer<typeof retryWorkerTaskSchema>;
