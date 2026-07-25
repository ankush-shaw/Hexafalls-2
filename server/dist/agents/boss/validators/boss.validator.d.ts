import { z } from 'zod';
export declare const analyzeRequestSchema: z.ZodObject<{
    prompt: z.ZodString;
    voiceTranscript: z.ZodOptional<z.ZodString>;
    conversationId: z.ZodOptional<z.ZodString>;
    attachments: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    prompt: string;
    conversationId?: string | undefined;
    voiceTranscript?: string | undefined;
    attachments?: string[] | undefined;
    metadata?: Record<string, unknown> | undefined;
}, {
    prompt: string;
    conversationId?: string | undefined;
    voiceTranscript?: string | undefined;
    attachments?: string[] | undefined;
    metadata?: Record<string, unknown> | undefined;
}>;
export declare const createWorkflowSchema: z.ZodObject<{
    conversationId: z.ZodString;
    prompt: z.ZodString;
    forceReplan: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    conversationId: string;
    prompt: string;
    forceReplan: boolean;
}, {
    conversationId: string;
    prompt: string;
    forceReplan?: boolean | undefined;
}>;
export declare const workflowIdParamSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export type AnalyzeRequestInput = z.infer<typeof analyzeRequestSchema>;
export type CreateWorkflowInput = z.infer<typeof createWorkflowSchema>;
