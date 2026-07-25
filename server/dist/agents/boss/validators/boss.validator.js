"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workflowIdParamSchema = exports.createWorkflowSchema = exports.analyzeRequestSchema = void 0;
const zod_1 = require("zod");
exports.analyzeRequestSchema = zod_1.z.object({
    prompt: zod_1.z.string().min(3, 'Prompt must be at least 3 characters.').max(4000, 'Prompt too long.'),
    voiceTranscript: zod_1.z.string().optional(),
    conversationId: zod_1.z.string().optional(),
    attachments: zod_1.z.array(zod_1.z.string()).optional(),
    metadata: zod_1.z.record(zod_1.z.unknown()).optional(),
});
exports.createWorkflowSchema = zod_1.z.object({
    conversationId: zod_1.z.string().min(1, 'Conversation ID is required.'),
    prompt: zod_1.z.string().min(3),
    forceReplan: zod_1.z.boolean().optional().default(false),
});
exports.workflowIdParamSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, 'Workflow ID is required.'),
});
