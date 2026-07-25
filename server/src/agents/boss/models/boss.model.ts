import { Schema, model, Document, Types } from 'mongoose';
import {
  BossStatus,
  BossDecision,
  IntentAnalysis,
  ComplexityEstimation,
  DepartmentNode,
  WorkflowGraph,
} from '../types/boss.types.js';

// ─── Boss Workflow Model ────────────────────────────────────────────────────
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

const workflowStageSchema = new Schema({
  stageId: { type: String, required: true },
  name: { type: String, required: true },
  department: { type: String, required: true },
  description: { type: String, required: true },
  estimatedDurationMs: { type: Number, default: 30000 },
  dependencies: [String],
  parallelizable: { type: Boolean, default: false },
}, { _id: false });

const bossWorkflowSchema = new Schema<IBossWorkflow>(
  {
    workflowId: { type: String, required: true, unique: true, index: true },
    workflowName: { type: String, required: true },
    conversationId: { type: String, required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
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
  },
  { timestamps: true }
);

bossWorkflowSchema.index({ userId: 1, createdAt: -1 });
bossWorkflowSchema.index({ status: 1 });

export const BossWorkflow = model<IBossWorkflow>('BossWorkflow', bossWorkflowSchema);

// ─── Boss Decision Log Model ────────────────────────────────────────────────
export interface IBossDecision extends Document {
  workflowId: string;
  decision: BossDecision;
  rationale: string;
  confidence: number;
  timestamp: Date;
}

const bossDecisionSchema = new Schema<IBossDecision>(
  {
    workflowId: { type: String, required: true, index: true },
    decision: { type: String, required: true },
    rationale: { type: String, required: true },
    confidence: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const BossDecisionLog = model<IBossDecision>('BossDecision', bossDecisionSchema);

// ─── Boss Memory Model ──────────────────────────────────────────────────────
export interface IBossMemory extends Document {
  conversationId: string;
  userId: Types.ObjectId;
  workflowIds: string[];
  summary: string;
  lastActive: Date;
}

const bossMemorySchema = new Schema<IBossMemory>(
  {
    conversationId: { type: String, required: true, unique: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    workflowIds: [String],
    summary: { type: String, default: '' },
    lastActive: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const BossMemory = model<IBossMemory>('BossMemory', bossMemorySchema);
