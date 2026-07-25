"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BossMemory = exports.BossDecisionLog = exports.BossWorkflow = void 0;
const mongoose_1 = require("mongoose");
const workflowStageSchema = new mongoose_1.Schema({
    stageId: { type: String, required: true },
    name: { type: String, required: true },
    department: { type: String, required: true },
    description: { type: String, required: true },
    estimatedDurationMs: { type: Number, default: 30000 },
    dependencies: [String],
    parallelizable: { type: Boolean, default: false },
}, { _id: false });
const bossWorkflowSchema = new mongoose_1.Schema({
    workflowId: { type: String, required: true, unique: true, index: true },
    workflowName: { type: String, required: true },
    conversationId: { type: String, required: true, index: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    prompt: { type: String, required: true },
    voiceTranscript: String,
    intent: {
        primaryGoal: String,
        secondaryGoals: [String],
        hiddenGoals: [String],
        requestType: String,
        urgency: String,
        priority: Number,
        confidence: Number,
        expectedOutput: String,
        successCriteria: [String],
    },
    complexity: {
        level: String,
        estimatedDurationMs: Number,
        estimatedWorkers: Number,
        estimatedQueueSize: Number,
        rationale: String,
    },
    departments: [
        {
            id: String,
            name: String,
            role: String,
            estimatedTasks: Number,
            priority: Number,
            _id: false,
        },
    ],
    graph: {
        stages: [workflowStageSchema],
        edges: [{ fromStageId: String, toStageId: String, _id: false }],
        executionStrategy: String,
    },
    bossDecision: {
        type: String,
        enum: ['approve', 'reject', 'needs_information', 'needs_clarification', 'ready_for_supervisor'],
        default: 'approve',
    },
    decisionRationale: { type: String, default: '' },
    overallConfidence: { type: Number, default: 0 },
    status: {
        type: String,
        enum: ['idle', 'receiving', 'reading', 'analyzing', 'planning', 'validating', 'completed', 'failed'],
        default: 'idle',
    },
    planningDurationMs: Number,
    supervisorJobId: String,
}, { timestamps: true });
bossWorkflowSchema.index({ userId: 1, createdAt: -1 });
bossWorkflowSchema.index({ status: 1 });
exports.BossWorkflow = (0, mongoose_1.model)('BossWorkflow', bossWorkflowSchema);
const bossDecisionSchema = new mongoose_1.Schema({
    workflowId: { type: String, required: true, index: true },
    decision: { type: String, required: true },
    rationale: { type: String, required: true },
    confidence: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
}, { timestamps: true });
exports.BossDecisionLog = (0, mongoose_1.model)('BossDecision', bossDecisionSchema);
const bossMemorySchema = new mongoose_1.Schema({
    conversationId: { type: String, required: true, unique: true, index: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    workflowIds: [String],
    summary: { type: String, default: '' },
    lastActive: { type: Date, default: Date.now },
}, { timestamps: true });
exports.BossMemory = (0, mongoose_1.model)('BossMemory', bossMemorySchema);
