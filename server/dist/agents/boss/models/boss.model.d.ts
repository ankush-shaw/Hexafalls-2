import { Document, Types } from 'mongoose';
import { BossStatus, BossDecision, IntentAnalysis, ComplexityEstimation, DepartmentNode, WorkflowGraph } from '../types/boss.types.js';
export interface IBossWorkflow extends Document {
    workflowId: string;
    workflowName: string;
    conversationId: string;
    userId: Types.ObjectId;
    prompt: string;
    voiceTranscript?: string;
    intent: IntentAnalysis;
    complexity: ComplexityEstimation;
    departments: DepartmentNode[];
    graph: WorkflowGraph;
    bossDecision: BossDecision;
    decisionRationale: string;
    overallConfidence: number;
    status: BossStatus;
    planningDurationMs?: number;
    supervisorJobId?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const BossWorkflow: import("mongoose").Model<IBossWorkflow, {}, {}, {}, Document<unknown, {}, IBossWorkflow, {}, {}> & IBossWorkflow & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>;
export interface IBossDecision extends Document {
    workflowId: string;
    decision: BossDecision;
    rationale: string;
    confidence: number;
    timestamp: Date;
}
export declare const BossDecisionLog: import("mongoose").Model<IBossDecision, {}, {}, {}, Document<unknown, {}, IBossDecision, {}, {}> & IBossDecision & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>;
export interface IBossMemory extends Document {
    conversationId: string;
    userId: Types.ObjectId;
    workflowIds: string[];
    summary: string;
    lastActive: Date;
}
export declare const BossMemory: import("mongoose").Model<IBossMemory, {}, {}, {}, Document<unknown, {}, IBossMemory, {}, {}> & IBossMemory & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>;
