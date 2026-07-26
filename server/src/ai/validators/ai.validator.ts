import { z } from 'zod';

export const chatRequestSchema = z.object({
  prompt: z.string().min(1, 'Prompt is required.'),
  systemInstruction: z.string().optional(),
  model: z.enum(['gemini-1.5-flash', 'gemini-1.5-pro', 'gpt-4o', 'claude-3.5-sonnet']).optional(),
  workflowId: z.string().optional(),
  conversationId: z.string().optional(),
});

export const reportRequestSchema = z.object({
  workflowId: z.string().min(1, 'Workflow ID is required.'),
  title: z.string().optional().default('Executive Performance & Operations Report'),
});

export const summarizeRequestSchema = z.object({
  content: z.string().min(1, 'Content is required.'),
  maxLength: z.number().optional().default(300),
});

export const recommendRequestSchema = z.object({
  workflowId: z.string().min(1, 'Workflow ID is required.'),
});

export type ChatRequestInput = z.infer<typeof chatRequestSchema>;
export type ReportRequestInput = z.infer<typeof reportRequestSchema>;
export type SummarizeRequestInput = z.infer<typeof summarizeRequestSchema>;
export type RecommendRequestInput = z.infer<typeof recommendRequestSchema>;
