import { z } from 'zod';

export const publishEventSchema = z.object({
  eventName: z.string().min(1, 'Event name is required.'),
  source: z.enum(['boss', 'supervisor', 'worker', 'workflow', 'system', 'frontend']),
  target: z.enum(['boss', 'supervisor', 'worker', 'workflow', 'frontend', 'all']),
  workflowId: z.string().optional(),
  executionId: z.string().optional(),
  priority: z.number().optional().default(5),
  payload: z.record(z.unknown()),
  metadata: z.record(z.unknown()).optional(),
});

export const replayEventsSchema = z.object({
  workflowId: z.string().min(1, 'Workflow ID is required.'),
  speedMultiplier: z.number().optional().default(1),
});

export type PublishEventInput = z.infer<typeof publishEventSchema>;
export type ReplayEventsInput = z.infer<typeof replayEventsSchema>;
