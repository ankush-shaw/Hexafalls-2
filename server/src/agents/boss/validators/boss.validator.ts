import { z } from 'zod';

export const analyzeRequestSchema = z.object({
  prompt: z.string().min(3, 'Prompt must be at least 3 characters.').max(4000, 'Prompt too long.'),
  voiceTranscript: z.string().optional(),
  conversationId: z.string().optional(),
  attachments: z.array(z.string()).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createWorkflowSchema = z.object({
  conversationId: z.string().min(1, 'Conversation ID is required.'),
  prompt: z.string().min(3),
  forceReplan: z.boolean().optional().default(false),
});

export const workflowIdParamSchema = z.object({
  id: z.string().min(1, 'Workflow ID is required.'),
});

export type AnalyzeRequestInput = z.infer<typeof analyzeRequestSchema>;
export type CreateWorkflowInput = z.infer<typeof createWorkflowSchema>;
